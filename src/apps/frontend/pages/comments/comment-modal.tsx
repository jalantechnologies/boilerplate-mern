import React, { useEffect } from 'react';
import { Button, FormControl, VerticalStackLayout } from '../../components';
import Modal from '../../components/modal';
import { ButtonType, ButtonSize } from '../../types/button';
import useCommentForm from './comments-form.hooks';

interface CommentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  taskId: string;
  userId: string;
  commentId?: string;
  initialText?: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  taskId,
  userId,
  commentId,
  initialText,
}) => {
  const formik = useCommentForm({
    onSuccess: () => setIsModalOpen(false),
    taskId,
    userId,
    commentId,
    initialText,
  });

  //Load initial comment text when editing
  useEffect(() => {
    if (initialText) {
      formik.setFieldValue('text', initialText);
    }
  }, [initialText, formik]);

  const isUpdating = !!commentId; //if editing or adding a comment

  return (
    <Modal isModalOpen={isModalOpen}>
      {/* Close Button */}
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsModalOpen(false)}
          startEnhancer={
            <img
              src="assets/svg/close-icon.svg"
              alt="close-icon"
              className="fill-current"
            />
          }
        />
      </div>

      {/* Comment Form */}
      <form onSubmit={formik.handleSubmit}>
        <VerticalStackLayout gap={5}>
          {/* Comment Text Input */}
          <FormControl
            error={formik.touched.text && formik.errors.text}
            label={'Comment'}
          >
            <textarea
              name="text"
              placeholder="Enter your comment"
              onChange={formik.handleChange}
              value={formik.values.text}
              className="border p-2 rounded w-full"
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            type={ButtonType.SUBMIT}
            onClick={formik.handleSubmit}
            isLoading={isUpdating} //Ensures boolean
            size={ButtonSize.DEFAULT}
            startEnhancer={
              !isUpdating && (
                <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
              )
            }
          >
            {isUpdating ? 'Update Comment' : 'Add Comment'}
          </Button>
        </VerticalStackLayout>
      </form>
    </Modal>
  );
};

export default CommentModal;
