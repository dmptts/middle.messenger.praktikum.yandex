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

export const validatePasswordConfirmation = (password: string, passwordConfirmation: string) => {
  if (password !== passwordConfirmation) {
    return 'Пароли не совпадают';
  }

  return null;
};

export const validateEmail = (email: string) => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
    return 'Неверный формат e-mail';
  }

  return null;
};

export const validateName = (name: string) => {
  if (!/^[A-ZА-Я]/.test(name)) {
    return 'Должно начинаться с заглавной буквы';
  }

  if (/\s/.test(name)) {
    return 'Не должно содержать пробелов';
  }

  if (/\d/.test(name)) {
    return 'Не должно содержать цифры';
  }

  if (!/^[a-zA-Zа-яА-ЯёЁ]+(-[a-zA-Zа-яА-ЯёЁ]+)*$/.test(name)) {
    return 'Не должно содержать спецсимволы';
  }

  return null;
};

export const validatePhone = (phone: string) => {
  if (phone.length < 10 || phone.length > 15) {
    return 'Длина должна быть от 10 до 15 символов';
  }

  if (!/^\+?\d+$/.test(phone)) {
    return 'Допустимы только цифры';
  }

  return null;
};
