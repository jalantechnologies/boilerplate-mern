
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  FormControl,
  Input,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import Modal from '../../components/modal';
import { useTaskContext } from '../../contexts';
import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';

interface ShareTaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  taskId: string;
}

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  taskId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const {
    getAccounts,
    isGetAccountsLoading,
    shareTask,
    accounts,
    setAccounts,
  } = useTaskContext();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts(1, 10, searchQuery);
        setAccounts(response); // Ensure response is correctly handled
      } catch (error) {
        toast.error('Failed to fetch accounts');
      }
    };
  
    if (isModalOpen) {
      fetchAccounts();
    }
  }, [searchQuery, isModalOpen]); // Ensure correct dependencies

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAccountSelection = (accountId: string) => {
    setSelectedAccounts((prev) => {
      if (prev.includes(accountId)) {
        return prev.filter((id) => id!== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedAccounts.length === 0) {
      toast.error('Please select at least one account to share the task with');
      return;
    }
    try {
      await Promise.all(
        selectedAccounts.map((accountId) => shareTask(taskId, accountId)),
      );
      toast.success('Task shared successfully');
      setIsModalOpen(false);
      setSelectedAccounts([]);
      setSearchQuery('');
    } catch (error) {
      toast.error('Failed to share task');
    }
  };

  return (
    <Modal isOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => {
            setIsModalOpen(false);
            setSelectedAccounts([]);
            setSearchQuery('');
          }}
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
        <FormControl label="Search Accounts" error={''}>
          <Input
            type="text"
            placeholder="Search by name or username"
            value={searchQuery}
            onChange={handleSearch}
            error={''}
          />
        </FormControl>

        {isGetAccountsLoading? (
          <Spinner />
        ) : (
          accounts.map((account) => (
            <div key={account.id} className="flex items-center">
              <input
                type="checkbox"
                id={`account-${account.id}`}
                checked={selectedAccounts.includes(account.id)}
                onChange={() => handleAccountSelection(account.id)}
              />
              <label htmlFor={`account-${account.id}`} className="ml-2">
                <div>{account.displayName}</div>
                <div className="text-sm text-gray-500">{account.username}</div>
              </label>
            </div>
          ))
        )}

        <Button
          onClick={handleSubmit}
          kind={ButtonKind.PRIMARY}
          size={ButtonSize.DEFAULT}
          type={ButtonType.SUBMIT}
        >
          Share Task
        </Button>
      </VerticalStackLayout>
    </Modal>
  );
};

export default ShareTaskModal;