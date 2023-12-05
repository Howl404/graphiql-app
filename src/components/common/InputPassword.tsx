import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { InputPasswordProps } from 'src/types';

export default function InputPassword<
  T extends FieldValues,
  K extends Path<T>,
>({ field, error, id, label }: InputPasswordProps<T, K>) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...field}
      type={showPassword ? 'text' : 'password'}
      id={id}
      label={label}
      error={error ? true : false}
      helperText={error?.message}
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
