import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../constants';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';
import { Task } from '../../types/task';

interface TaskFormProps {
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
  commentInitialValues?: { content: string; taskId: string };
}
const useTaskForm = ({
  onError,
  onSuccess,
  commentInitialValues,
}: TaskFormProps) => {
  const {
    addTask,
    addComment,
    setTasksList,
    tasksList,
    updateTask,
    isAddTaskLoading,
    isUpdateTaskLoading,
    isAddCommentLoading,
  } = useTaskContext();

  const setFormikFieldValue = (
    formik: FormikProps<Task>,
    fieldName: string,
    data: string
  ) => {
    formik
      .setFieldValue(fieldName, data)
      .then()
      .catch((err) => {
        onError(err as AsyncError);
      });
  };

  const updateTaskFormik = useFormik({
    initialValues: {
      id: '',
      description: '',
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(constant.TITLE_MIN_LENGTH, constant.TITLE_VALIDATION_ERROR)
        .required(constant.TITLE_VALIDATION_ERROR),
      description: Yup.string()
        .min(
          constant.DESCRIPTION_MIN_LENGTH,
          constant.DESCRIPTION_VALIDATION_ERROR
        )
        .required(constant.DESCRIPTION_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      updateTask(values.id, {
        title: values.title,
        description: values.description,
      })
        .then((response) => {
          const newUpdatedTasks = tasksList.map((taskData) => {
            if (taskData.id === values.id) {
              return response;
            }
            return taskData;
          });
          setTasksList(newUpdatedTasks);
          onSuccess();
          updateTaskFormik.resetForm();
        })
        .catch((error) => onError(error as AsyncError));
    },
  });

  const addTaskFormik = useFormik({
    initialValues: {
      id: '',
      description: '',
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(constant.TITLE_MIN_LENGTH, constant.TITLE_VALIDATION_ERROR)
        .required(constant.TITLE_VALIDATION_ERROR),
      description: Yup.string()
        .min(
          constant.DESCRIPTION_MIN_LENGTH,
          constant.DESCRIPTION_VALIDATION_ERROR
        )
        .required(constant.DESCRIPTION_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      addTask(values.title, values.description)
        .then((newTask) => {
          setTasksList([...tasksList, newTask]);
          onSuccess();
          addTaskFormik.resetForm();
        })
        .catch((error) => {
          onError(error as AsyncError);
        });
    },
  });

  const addCommentFormik = useFormik({
    initialValues: {
      taskId: commentInitialValues?.taskId ?? '',
      content: commentInitialValues?.content ?? '',
    },
    validationSchema: Yup.object({
      taskId: Yup.string().trim().required('Please select a valid task.'),
      content: Yup.string()
        .trim()
        .min(1, 'Comment must be at least 1 characters long.')
        .max(500, 'Comment cannot exceed 500 characters.')
        .required('Comment cannot be empty.'),
    }),
    onSubmit: (values) => {
      addComment(values.taskId, values.content)
        .then(() => {
          onSuccess?.();
          addCommentFormik.resetForm();
        })
        .catch((error) => onError?.(error as AsyncError));
    },
  });

  return {
    addTaskFormik,
    isAddTaskLoading,
    isUpdateTaskLoading,
    setFormikFieldValue,
    updateTaskFormik,
    addCommentFormik,
    isAddCommentLoading,
  };
};

export default useTaskForm;
