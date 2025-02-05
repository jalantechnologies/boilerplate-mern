import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../constants';
import { useTodoContext } from '../../contexts';
import { AsyncError, AllTodos } from '../../types';
import { Todo } from '../../types/todo';

interface TodoFormProps {
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
}

const useTodoForm = ({ onError, onSuccess }: TodoFormProps) => {
  const {
    createTodo,
    setTodosList,
    todosList,
    updateTodo,
    isCreateTodoLoading,
    isUpdateTodoLoading,
  } = useTodoContext();

  const setFormikFieldValue = (
    formik: FormikProps<Todo>,
    fieldName: string,
    data: string | boolean | Date,
  ) => {
    formik
      .setFieldValue(fieldName, data)
      .then()
      .catch((err) => {
        onError(err as AsyncError);
      });
  };

  const updateTodoFormik = useFormik({
    initialValues: {
      id: '',
      description: '',
      title: '',
      type: '',
      dueDate: new Date(),
      isCompleted: false,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(constant.TITLE_MIN_LENGTH, constant.TITLE_VALIDATION_ERROR)
        .required(constant.TITLE_VALIDATION_ERROR),
      description: Yup.string()
        .min(
          constant.DESCRIPTION_MIN_LENGTH,
          constant.DESCRIPTION_VALIDATION_ERROR,
        )
        .required(constant.DESCRIPTION_VALIDATION_ERROR),

      type: Yup.string().required('Type is required'),
      dueDate: Yup.date().required('Due Date is required'),
      isCompleted: Yup.boolean(),
    }),
    onSubmit: (values) => {
      updateTodo(values.id, {
        title: values.title,
        description: values.description,
        type: values.type,
        dueDate: new Date(values.dueDate),
        isCompleted: values.isCompleted,
      })
        .then((response) => {
          const newTodosList: AllTodos = {
            overdue: todosList.overdue.map((todo) =>
              todo.id === values.id ? response : todo,
            ),
            completed: todosList.completed.map((todo) =>
              todo.id === values.id ? response : todo,
            ),
            pending: todosList.pending.map((todo) =>
              todo.id === values.id ? response : todo,
            ),
          };
          setTodosList(newTodosList);
          onSuccess();
          updateTodoFormik.resetForm();
        })
        .catch((error) => onError(error as AsyncError));
    },
  });

  const createTodoFormik = useFormik({
    initialValues: {
      id: '',
      description: '',
      title: '',
      type: '',
      dueDate: new Date(),
      isCompleted: false,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(constant.TITLE_MIN_LENGTH, constant.TITLE_VALIDATION_ERROR)
        .required(constant.TITLE_VALIDATION_ERROR),
      description: Yup.string()
        .min(
          constant.DESCRIPTION_MIN_LENGTH,
          constant.DESCRIPTION_VALIDATION_ERROR,
        )
        .required(constant.DESCRIPTION_VALIDATION_ERROR),
      type: Yup.string().required('Type is required'),
      dueDate: Yup.date().required('Due Date is required'),
    }),
    onSubmit: (values) => {
      createTodo(
        values.title,
        values.description,
        values.type,
        new Date(values.dueDate),
      )
        .then((newTodo) => {
          const newTodosList: AllTodos = {
            overdue: todosList.overdue,
            completed: todosList.completed,
            pending: [...todosList.pending, newTodo],
          };
          setTodosList(newTodosList);
          onSuccess();
          createTodoFormik.resetForm();
        })
        .catch((error) => {
          onError(error as AsyncError);
        });
    },
  });

  return {
    createTodoFormik,
    isCreateTodoLoading,
    isUpdateTodoLoading,
    setFormikFieldValue,
    updateTodoFormik,
  };
};

export default useTodoForm;
