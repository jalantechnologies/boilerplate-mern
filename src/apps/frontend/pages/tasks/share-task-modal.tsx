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
  const [page, setPage] = useState(1);
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
        const response = await getAccounts(page, 10, searchQuery);
        if (response) {
          setAccounts(response);
        } else {
          setAccounts(response);
        }
      } catch (error) {}
    };

    if (isModalOpen) {
      fetchAccounts();
    }
  }, [page, searchQuery, isModalOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleAccountSelection = (accountId: string) => {
    setSelectedAccounts((prev) => {
      if (prev.includes(accountId)) {
        return prev.filter((id) => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(
        selectedAccounts.map((accountId) => shareTask(taskId, accountId)),
      );
      toast.success('Task shared successfully');
      setIsModalOpen(false);
      setSelectedAccounts([]);
      setSearchQuery('');
      setPage(1);
    } catch (error) {
      toast.error('Failed to share task');
    }
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => {
            setIsModalOpen(false);
            setSelectedAccounts([]);
            setSearchQuery('');
            setPage(1);
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

        {isGetAccountsLoading ? (
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

        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            kind={ButtonKind.SECONDARY}
            size={ButtonSize.COMPACT}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            kind={ButtonKind.SECONDARY}
            size={ButtonSize.COMPACT}
          >
            Next
          </Button>
        </div>

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
