import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';

interface CommentFormProps {
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
}

const useCommentForm = ({ onError, onSuccess }: CommentFormProps) => {
  const { addComment, isAddCommentLoading } = useTaskContext();

  const addCommentFormik = useFormik({
    initialValues: {
      taskId: '',
      content: '',
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .min(1, 'Comment must be at least 1 character long')
        .required('Comment is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      addComment(values.taskId, values.content)
        .then(() => {
          onSuccess && onSuccess();
          resetForm();
        })
        .catch((error) => {
          onError && onError(error as AsyncError);
        });
    },
  });

  return {
    addCommentFormik,
    isAddCommentLoading,
  };
};

export default useCommentForm;