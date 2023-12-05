import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

export type AuthFormInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type InputPasswordProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  error: FieldError | undefined;
  id: string;
  label: string;
};
