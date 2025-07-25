import Form from '../../components/Form';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Component from '../../services/Component';
import { validateLogin, validatePassword } from '../../utils/validation';
import template from './template.hbs?raw';
import { Routes } from "../../App";
import AuthController from "../../controllers/AuthController";

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  render() {
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
      onSubmit: async (e) => {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries()) as {
          login: string;
          password: string;
        };

        await AuthController.signIn({
          login: data.login,
          password: data.password,
        })
      },
    });

    const link = new Link({
      text: 'Нет аккаунта?',
      to: Routes.SignUp,
      className: 'login-page__registration-link',
    })

    return this.compile(template, {
      loginForm,
      link,
    });
  }
}
