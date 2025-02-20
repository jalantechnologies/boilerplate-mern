import { useFormik } from 'formik';
import CommentService from '../../services/comment.services';

interface UseCommentFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  initialText?: string;
  commentId?: string;
  taskId: string;
  userId: string;
}

const useCommentForm = ({ onSuccess, onError, initialText = '', commentId, taskId, userId }: UseCommentFormProps) => {
  return useFormik({
    initialValues: { text: initialText },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (commentId) {
          await CommentService.updateComment(commentId, values.text);
        } else {
          await CommentService.createComment(taskId, userId, values.text);
        }
        resetForm();
        onSuccess?.();
      } catch (error) {
        onError?.(error as Error);
      }
    },
  });
};

export default useCommentForm;
