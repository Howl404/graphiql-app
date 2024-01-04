export default function passwordValidation(password: string) {
  switch (true) {
    case !/\p{Lu}/u.test(password):
      return 'At least one uppercase letter';
    case !/\p{Ll}/u.test(password):
      return 'At least one lowercase letter';
    case !/\p{N}/u.test(password):
      return 'At least one number';
    case !/["#$%&'()*+,-./:;<=>!?@[\]^_`{|}~]/u.test(password):
      return 'At least one special character';
    case password.length < 8:
      return 'At least 8 characters';
    default:
      return true;
  }
}
