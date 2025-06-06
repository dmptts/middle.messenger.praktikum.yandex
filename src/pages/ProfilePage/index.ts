import BackButton from '../../components/BackButton';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Userpic from '../../components/Userpic';
import Component from '../../services/Component';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validatePhone
} from '../../utils/validation';
import template from './template.hbs?raw';
import Button from "../../components/Button";
import { Routes } from "../../App";

const enum ProfilePageModes {
  Default = 'DEFAULT',
  Edit = 'EDIT',
  ChangePassword = 'CHANGE_PASSWORD',
}

interface ProfilePageState {
  mode: ProfilePageModes;
}

export default class ProfilePage extends Component<never, ProfilePageState> {
  constructor() {
    super();
    this.setState({
      mode: ProfilePageModes.Default,
    });
  }

  protected render() {
    const emailInput = new Input({
      id: 'email-input',
      name: 'email',
      type: 'text',
      label: 'Почта',
      value: 'pochta@yandex.ru',
      labelPosition: 'left',
      validation: validateEmail,
      onBlur: () => emailInput.validate(),
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const loginInput = new Input({
      id: 'login-input',
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: 'ivanivanov',
      labelPosition: 'left',
      validation: validateLogin,
      onBlur: () => loginInput.validate(),
    });

    const firstNameInput = new Input({
      id: 'first-name-input',
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      value: 'Иван',
      labelPosition: 'left',
      validation: validateName,
      onBlur: () => firstNameInput.validate(),
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const secondNameInput = new Input({
      id: 'second-name-input',
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      value: 'Иванов',
      labelPosition: 'left',
      validation: validateName,
      onBlur: () => secondNameInput.validate(),
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const usernameInput = new Input({
      id: 'username-input',
      name: 'username',
      type: 'text',
      label: 'Имя в чате',
      value: 'Иван',
      labelPosition: 'left',
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const phoneInput = new Input({
      id: 'phone-input',
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      value: '+7 (909) 967 30 30',
      labelPosition: 'left',
      validation: validatePhone,
      onBlur: () => phoneInput.validate(),
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const oldPasswordInput = new Input({
      id: 'old-password-input',
      name: 'old-password',
      type: 'password',
      label: 'Старый пароль',
      labelPosition: 'left',
    });

    const passwordInput = new Input({
      id: 'password-input',
      name: 'password',
      type: 'password',
      label: 'Пароль',
      labelPosition: 'left',
      validation: validatePassword,
      onBlur: () => passwordInput.validate(),
    });

    const passwordConfirmationInput = new Input({
      id: 'password-confirmation-input',
      name: 'password',
      type: 'password',
      label: 'Пароль (еще раз)',
      labelPosition: 'left',
      validation: (value) => validatePasswordConfirmation(passwordInput.value, value),
      onBlur: () => passwordConfirmationInput.validate(),
    });

    return this.compile(template, {
      userpic: new Userpic({
        size: 130,
        withChange: true,
        className: 'profile-page__userpic',
      }),
      form: new Form({
        body: this.state?.mode === ProfilePageModes.ChangePassword ? [
          oldPasswordInput,
          passwordInput,
          passwordConfirmationInput,
        ] : [
          emailInput,
          loginInput,
          firstNameInput,
          secondNameInput,
          usernameInput,
          phoneInput,
        ],
        className: 'profile-page__form',
        buttonText: this.state?.mode === ProfilePageModes.Edit ? 'Сохранить' : null,
      }),
      editProfileLink: new Button({
        text: 'Изменить данные',
        variant: 'link',
        onClick: () => this.setState({ mode: ProfilePageModes.Edit }),
      }),
      changePasswordLink: new Button({
        text: 'Изменить пароль',
        variant: 'link',
        onClick: () => this.setState({ mode: ProfilePageModes.ChangePassword }),
      }),
      quitLink: new Link({
        text: 'Выйти',
        className: 'profile-page__quit-button',
        to: Routes.Login,
      }),
      backButton: new BackButton(),
    })
  }
}
