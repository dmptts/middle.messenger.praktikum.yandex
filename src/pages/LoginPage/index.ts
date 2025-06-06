import Form from '../../components/Form';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import { validateLogin, validatePassword } from '../../utils/validation';
import template from './template.hbs?raw';
import { Routes } from "../../App";

interface InternalLoginPageProps extends BaseProps {
  loginForm: Form;
  link: Link;
}

export default class LoginPage extends Component<InternalLoginPageProps> {
  constructor() {
    const loginInput = new Input({
      id: 'username-input',
      name: 'login',
      type: 'text',
      label: 'Логин',
      validation: validateLogin,
      onBlur: () => loginInput.validate(),
    });

    const passwordInput = new Input({
      id: 'password-input',
      name: 'password',
      type: 'password',
      label: 'Пароль',
      validation: validatePassword,
      onBlur: () => passwordInput.validate(),
    });

    const loginForm = new Form({
      body: [
        loginInput,
        passwordInput,
      ],
      buttonText: 'Авторизоваться',
      className: 'login-form login-page__form',
    });

    const link = new Link({
      text: 'Нет аккаунта?',
      to: Routes.SignUp,
      className: 'login-page__registration-link',
    })

    super({
      loginForm,
      link,
    });
  }

  render() {
    return this.compile(template);
  }
}
