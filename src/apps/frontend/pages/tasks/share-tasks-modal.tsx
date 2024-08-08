import React, { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  HeadingSmall,
  Input,
  ParagraphSmall,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import Modal from '../../components/modal';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';
import { useAccountContext, useTaskContext } from '../../contexts';
import AccountItem from './account-item';
import toast from 'react-hot-toast';

interface ShareTasksModalProps {
  btnText: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  taskIds: string[];
  resetSelectedTasks: () => void;
}

const ShareTasksModal: React.FC<ShareTasksModalProps> = ({
  btnText,
  isModalOpen,
  setIsModalOpen,
  resetSelectedTasks,
  taskIds,
}) => {
  const {
    getAllActiveAccounts,
    activeAccountsToDisplay,
    isGetAllActiveAccountsLoading,
    handleUserQuery,
  } = useAccountContext();

  const { shareTasks, isShareTaskLoading } = useTaskContext();

  useEffect(() => {
    getAllActiveAccounts().catch((error) => onError(error as AsyncError));
  }, []);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const onSuccess = () => {
    toast.success(`${taskIds.length===1?'Task':'Tasks'} shared successfully`);
    setIsModalOpen(false);
    setSelectedUsers([]);
    handleUserQuery('');
    resetSelectedTasks();
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const handleSumbit = () => {
    shareTasks(taskIds, selectedUsers)
      .then(() => onSuccess())
      .catch((error) => onError(error));
  };

  const handleToggle = (userId: string) => {
    setSelectedUsers(
      selectedUsers.includes(userId)
        ? selectedUsers.filter((id) => id !== userId)
        : [...selectedUsers, userId],
    );
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsModalOpen(false)}
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
        <HeadingSmall>
          Share {taskIds.length === 1 ? 'task' : 'tasks'} with other users
        </HeadingSmall>
        <Input
          data-testid="title"
          disabled={isGetAllActiveAccountsLoading}
          error=""
          onChange={(e) => handleUserQuery(e.target.value)}
          placeholder="Search user by name or email"
          type="text"
        />
        <FormControl error="" label={'Share task(s) with'}>
          {isGetAllActiveAccountsLoading ? (
            <Spinner />
          ) : activeAccountsToDisplay.length > 0 ? (
            activeAccountsToDisplay.map((accountDetails) => (
              <AccountItem
                account={accountDetails}
                handleToggle={handleToggle}
                selected={selectedUsers.includes(accountDetails.id)}
              />
            ))
          ) : (
            <ParagraphSmall>No users to display</ParagraphSmall>
          )}
        </FormControl>
        <Button
          type={ButtonType.SUBMIT}
          onClick={handleSumbit}
          disabled={selectedUsers.length === 0}
          size={ButtonSize.DEFAULT}
          isLoading={isShareTaskLoading}
          startEnhancer={
            <img src="assets/svg/share-icon.svg" alt="Share Icon" />
          }
        >
          {btnText}
        </Button>
      </VerticalStackLayout>
    </Modal>
  );
};

export default ShareTasksModal;
