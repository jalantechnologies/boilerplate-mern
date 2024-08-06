import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Input,
  VerticalStackLayout,
} from '../../components';
import Modal from '../../components/modal';
import { ButtonKind } from '../../types/button';
import { Account } from '../../types/account';
import AccountService from '../../services/account.service';
import SharedTaskService from '../../services/shared-tasks.service';
import { Task } from '../../types/task';
import { toast } from 'react-hot-toast';

const sharedTaskService = new SharedTaskService();

interface ShareTaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  task,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      fetchAccounts();
    }
  }, [isModalOpen, search, page]);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await new AccountService().getAccounts({
        search,
        page,
        size: 10,
      });
      if (response.data.length === 0) {
        setError('No accounts match your search');
      } else {
        setError('');
      }
      setAccounts(response.data);
    } catch (error) {
      toast.error('Failed to load accounts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareTask = async () => {
    try {
      await sharedTaskService.shareTask(task.id, selectedAccounts);
      toast.success('Task shared successfully');
      closeModal();
    } catch (error) {
      toast.error('Failed to share task');
    }
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId],
    );
  };

  const resetModal = () => {
    setAccounts([]);
    setSelectedAccounts([]);
    setSearch('');
    setPage(1);
    setError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetModal();
  };

  const buttonStyle = {
    padding: '15px 15px', 
    fontSize: '18px', 
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={closeModal}
          kind={ButtonKind.TERTIARY}
          startEnhancer={
            <img
              src="assets/svg/close-icon.svg"
              alt="close-icon"
              className="fill-current"
            />
          }
        ></Button>
      </div>
      <VerticalStackLayout gap={5}>
        <FormControl label="Search Accounts" error={error}>
          <Input
            data-testid="search"
            disabled={isLoading}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or username"
            type="text"
            value={search}
            error={error ? error : ''}
          />
        </FormControl>
        <div className="account-list space-y-2">
          {isLoading ? (
            <div>Loading...</div>
          ) : accounts.length === 0 ? (
            <div>No accounts match your search</div>
          ) : (
            accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center space-x-3 p-2 border rounded-md"
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={() => handleAccountSelect(account.id)}
                  />
                  <span>
                    {account.firstName} {account.lastName} 
                    ( { account.username } )
                  </span>
                </label>
              </div>
            ))
          )}
        </div>
        
        <div style={buttonStyle}>
          <Button
            onClick={handleShareTask}
            disabled={selectedAccounts.length === 0}
          >
            Share Task
          </Button>
        </div>
      </VerticalStackLayout>
    </Modal>
  );
};

export default ShareTaskModal;