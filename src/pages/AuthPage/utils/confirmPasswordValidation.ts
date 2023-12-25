import { AuthFormInputs } from 'src/types';

export default function confirmPasswordValidation(
  confirmPassword: string | undefined,
  { password }: AuthFormInputs
): boolean | string {
  return password === confirmPassword || 'Passwords do not match';
}
