import { AuthFormInputs } from 'src/types.ts';

export default function confirmPasswordValidation(
  confirmPassword: string | undefined,
  { password }: AuthFormInputs
): boolean | string {
  return password === confirmPassword || 'Passwords do not match';
}
