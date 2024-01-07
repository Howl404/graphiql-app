import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

type InputPasswordProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  error?: FieldError;
  id: string;
  label: string;
  autocomplete: string;
};

export default function InputPassword<
  T extends FieldValues,
  K extends Path<T>,
>({ field, error, id, label, autocomplete }: InputPasswordProps<T, K>) {
  const [showPassword, setShowPassword] = useState(false);

  const type = showPassword ? 'text' : 'password';

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...field}
      type={type}
      id={id}
      label={label}
      error={!!error}
      helperText={error?.message}
      autoComplete={autocomplete}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordVisibility}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
