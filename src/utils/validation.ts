export const validateLogin = (login: string) => {
  if (login.length < 3 || login.length > 20) {
    return 'Длина должна быть от 3 до 20 символов';
  }

  if (/\s/.test(login)) {
    return 'Не должен содержать пробелы';
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(login)) {
    return 'Не должен содержать спецсимволы';
  }

  if (/^\d+$/.test(login)) {
    return 'Не может состоять только из цифр';
  }

  return null;
};

export const validatePassword = (password: string) => {
  if (password.length < 6) {
    return 'Не должен быть короче 6 символов';
  }

  if (password.length > 40) {
    return 'Не должен быть длиннее 40 символов';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Должен содержать хотя бы одну заглавную букву';
  }

  if (!/\d/.test(password)) {
    return 'Должен содержать хотя бы одну цифру';
  }

  return null;
};
