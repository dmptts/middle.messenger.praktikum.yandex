import BackButton from '../../components/BackButton';
import Form from '../../components/Form';
import Input from '../../components/Input';
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
import { RootStore } from "../../main";
import { connect } from "../../services/Store";
import ProfileController from "../../controllers/ProfileController";
import { ChangeProfileRequestDTO } from "../../apis/UserAPI";
import AuthController from "../../controllers/AuthController";
import { HTTPTransport } from "../../apis/HTTPTransport";
import { Router } from "../../services/Router";
import { Routes } from "../../App";

const enum ProfilePageModes {
  Default = 'DEFAULT',
  Edit = 'EDIT',
  ChangePassword = 'CHANGE_PASSWORD',
}

interface ProfilePageState {
  mode: ProfilePageModes;
}

class ProfilePage extends Component<never, ProfilePageState> {
  constructor() {
    super();
    this.setState({
      mode: ProfilePageModes.Default,
    });
    RootStore.subscribe(state => {
      this.props = { currentUser: state.currentUser }
    });
  }

  protected render() {
    const emailInput = new Input({
      id: 'email-input',
      name: 'email',
      type: 'text',
      label: 'Почта',
      value: RootStore.state.currentUser?.email ?? '',
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
      value: RootStore.state.currentUser?.login ?? '',
      labelPosition: 'left',
      validation: validateLogin,
      onBlur: () => loginInput.validate(),
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const firstNameInput = new Input({
      id: 'first-name-input',
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      value: RootStore.state.currentUser?.first_name ?? '',
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
      value: RootStore.state.currentUser?.second_name ?? '',
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
      value: RootStore.state.currentUser?.login ?? '',
      labelPosition: 'left',
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const phoneInput = new Input({
      id: 'phone-input',
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      value: RootStore.state.currentUser?.phone ?? '',
      labelPosition: 'left',
      validation: validatePhone,
      onBlur: () => phoneInput.validate(),
      disabled: this.state?.mode !== ProfilePageModes.Edit,
    });

    const oldPasswordInput = new Input({
      id: 'old-password-input',
      name: 'oldPassword',
      type: 'password',
      label: 'Старый пароль',
      labelPosition: 'left',
    });

    const passwordInput = new Input({
      id: 'password-input',
      name: 'newPassword',
      type: 'password',
      label: 'Пароль',
      labelPosition: 'left',
      validation: validatePassword,
      onBlur: () => passwordInput.validate(),
    });

    const passwordConfirmationInput = new Input({
      id: 'password-confirmation-input',
      name: 'newPassword',
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
        src: `${HTTPTransport.BASE_URL}/resources${RootStore.state.currentUser?.avatar}`
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
        buttonText: this.state?.mode !== ProfilePageModes.Default ? 'Сохранить' : null,
        onSubmit: async (e) => {
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          if (this.state?.mode === ProfilePageModes.Edit) {
            const data = Object.fromEntries(formData.entries()) as ChangeProfileRequestDTO;
            await ProfileController.changeProfile(data)
            this.setState({ mode: ProfilePageModes.Default })
          } else if (this.state?.mode === ProfilePageModes.ChangePassword) {
            const { oldPassword, newPassword } = Object.fromEntries(formData.entries())

            if (typeof oldPassword === 'string' && typeof newPassword === 'string') {
              await ProfileController.changePassword({ oldPassword, newPassword })
              this.setState({ mode: ProfilePageModes.Default })
            }
          }
        },
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
      quitLink: new Button({
        text: 'Выйти',
        variant: 'link',
        className: 'profile-page__quit-button',
        onClick: async () => await AuthController.logOut(),
      }),
      backButton: new BackButton({
        onClick: () => this.state!.mode !== ProfilePageModes.Default
          ? this.setState({ mode: ProfilePageModes.Default })
          : Router.getInstance().go(Routes.Messenger),
      }),
    })
  }

  protected async componentDidMount() {
    await AuthController.getUser();
  }
}

export default connect(ProfilePage, (state) => ({ currentUser: state.currentUser }));
