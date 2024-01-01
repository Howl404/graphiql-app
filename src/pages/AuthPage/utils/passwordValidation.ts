export default function passwordValidation(password: string) {
  switch (true) {
    case !/[A-Z]/.test(password):
      return 'At least one uppercase letter';
    case !/[a-z]/.test(password):
      return 'At least one lowercase letter';
    case !/[0-9]/.test(password):
      return 'At least one number';
    case !/[^A-Za-z0-9]/.test(password):
      return 'At least one special character';
    case password.length < 8:
      return 'At least 8 characters';
    default:
      return true;
  }
}
