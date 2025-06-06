import Form from '../../components/Form';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validatePhone,
} from '../../utils/validation';
import template from './template.hbs?raw';

interface RegistrationPageProps extends BaseProps {
  form: Form;
  link: Link;
}

export default class RegistrationPage extends Component<RegistrationPageProps> {
  constructor() {
    const emailInput = new Input({
      id: 'email-input',
      name: 'email',
      type: 'text',
      label: 'Почта',
      validation: validateEmail,
      onBlur: () => emailInput.validate(),
    });

    const loginInput = new Input({
      id: 'login-input',
      name: 'login',
      type: 'text',
      label: 'Логин',
      validation: validateLogin,
      onBlur: () => loginInput.validate(),
    });

    const firstNameInput = new Input({
      id: 'first-name-input',
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      validation: validateName,
      onBlur: () => firstNameInput.validate(),
    });

    const secondNameInput = new Input({
      id: 'second-name-input',
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      validation: validateName,
      onBlur: () => secondNameInput.validate(),
    });

    const phoneInput = new Input({
      id: 'phone-input',
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      validation: validatePhone,
      onBlur: () => phoneInput.validate(),
    });

    const passwordInput = new Input({
      id: 'password-input',
      name: 'password',
      type: 'password',
      label: 'Пароль',
      validation: validatePassword,
      onBlur: () => passwordInput.validate(),
    });

    const passwordConfirmationInput = new Input({
      id: 'password-confirmation-input',
      name: 'password',
      type: 'password',
      label: 'Пароль (еще раз)',
      validation: (value) => validatePasswordConfirmation(passwordInput.value, value),
      onBlur: () => passwordConfirmationInput.validate(),
    });

    super({
      form: new Form({
        body: [
          emailInput,
          loginInput,
          firstNameInput,
          secondNameInput,
          passwordInput,
          passwordConfirmationInput,
        ],
        buttonText: 'Зарегистрироваться',
        className: 'registration-form registration-page__form',
      }),
      link: new Link({
        text: 'Войти',
        className: 'registration-page__login-link',
        to: '/',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
