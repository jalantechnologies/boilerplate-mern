import { FormikProps } from 'formik';
import React from 'react';

import {
  Button,
  FormControl,
  Input,
  VerticalStackLayout,
} from '../../components';
import Modal from '../../components/modal';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';

import useTaskForm from './tasks-form.hook';

interface ShareTaskModalProps {
  formik: FormikProps<{ taskId: string; username: string }>;
  isModalOpen: boolean;
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
  setIsModalOpen: (open: boolean) => void;
}

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({
  formik,
  isModalOpen,
  onError,
  onSuccess,
  setIsModalOpen,
}) => {
  const { isAddTaskLoading, isUpdateTaskLoading } = useTaskForm({ onSuccess, onError });

  const handleClick = () => {
    if (isAddTaskLoading || isUpdateTaskLoading) {
      setIsModalOpen(false);
    }
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

      <form onSubmit={formik.handleSubmit}>
        <VerticalStackLayout gap={5}>
          <FormControl
            error={formik.touched.username && formik.errors.username}
            label={'Username to share with'}
          >
            <Input
              data-testid="username"
              disabled={false}
              error={formik.touched.username && formik.errors.username}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter username"
              type="text"
              value={formik.values.username}
            />
          </FormControl>
          <Button
            type={ButtonType.SUBMIT}
            onClick={handleClick}
            isLoading={isAddTaskLoading || isUpdateTaskLoading}
            size={ButtonSize.DEFAULT}
            startEnhancer={
              !isAddTaskLoading && !isUpdateTaskLoading && (
                <img src="assets/svg/share-icon.svg" alt="Share Icon" />
              )
            }
          >
            Share Task
          </Button>
        </VerticalStackLayout>
      </form>
    </Modal>
  );
};

export default ShareTaskModal;
