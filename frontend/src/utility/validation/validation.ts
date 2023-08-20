export class Validation {
  static full_name = {
    required: 'Full name is required',
    pattern: {
      value: /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}/,
      message: 'Invalid full name format',
    },
    minLength: {
      value: 2,
      message: 'Full name is too short',
    },
    maxLength: {
      value: 50,
      message: 'Full name is too long',
    },
  };

  static email = {
    required: 'Email is required',
    pattern: {
      value: /\w{3,}[@][a-z]\w{3,}[.]\w{2,5}/gi,
      message: 'Email required. Example: Alice@gmail.com',
    },
  };

  static password = {
    required: 'Password is required',
    minLength: {
      value: 4,
      message: 'Password has to be longer than 4 letters',
    },
  };

  static service = {
    required: 'Service is required',
    minLength: {
      value: 4,
      message: 'Text has to be longer than 4 letters',
    },
  };

  static reservation_code = {
    required: 'Reservation code is required',
    minLength: {
      value: 8,
      message: 'Reservation code must contain 8 numbers',
    },
  };

  static secret_screen_key = {
    required: 'Secret screen key is required',
    minLength: {
      value: 6,
      message: 'Secret screen key must contain 6 numbers',
    },
  };
}
