import { useFormik } from 'formik';
import { createComment, updateComment } from '../../services/comment.services';


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
          await updateComment({ commentId, text: values.text });
        } else {
          await createComment({ taskId, userId, text: values.text });
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
