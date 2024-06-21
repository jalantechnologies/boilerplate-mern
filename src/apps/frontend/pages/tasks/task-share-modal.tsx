import React, { useEffect, useState } from 'react';
import {
  Button,
  LabelLarge,
  ParagraphSmall,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import Modal from '../../components/modal';
import Checkbox from '../../components/checkbox';
import { ButtonKind, ButtonSize } from '../../types/button';
import { useTaskContext } from '../../contexts/task.provider';
import { User } from '../../types/task';

interface ShareTaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  taskId: string;
}

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  taskId,
}) => {
  const { getUsers, users, shareTask, isGetUsersLoading } = useTaskContext();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      getUsers(1, '');
    }
  }, [isModalOpen, getUsers]);

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleShareTask = async () => {
    await shareTask(taskId, selectedUsers);
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <VerticalStackLayout gap={3}>
        <LabelLarge>Share Task</LabelLarge>
        {isGetUsersLoading ? (
          <Spinner />
        ) : (
          users.map((user: User) => (
            <div key={user.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              <div>
                <ParagraphSmall>
                  {user.firstName} {user.lastName}
                </ParagraphSmall>
                <ParagraphSmall>{user.username}</ParagraphSmall>
              </div>
            </div>
          ))
        )}
        <Button
          kind={ButtonKind.PRIMARY}
          size={ButtonSize.DEFAULT}
          onClick={handleShareTask}
          disabled={selectedUsers.length === 0}
        >
          Share Task
        </Button>
        <Button
          kind={ButtonKind.SECONDARY}
          size={ButtonSize.DEFAULT}
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
      </VerticalStackLayout>
    </Modal>
  );
};

export default ShareTaskModal;
