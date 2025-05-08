import { globalStorage, Pages } from '../../App';
import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Userpic from '../../components/Userpic';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../utils/validation';
import template from './template.hbs?raw';

interface ProfilePageProps extends BaseProps {
  userpic: Userpic;
  form: Form;
  backButton: BackButton;
  footer: Footer;
}

export default class ProfilePage extends Component<ProfilePageProps> {
  constructor() {
    super({
      userpic: new Userpic({
        size: 130,
        withChange: true,
        className: 'profile-page__userpic',
      }),
      backButton: new BackButton(),
      form: new Form({
        body: [
          new Input({
            id: 'email-input',
            name: 'email',
            type: 'text',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            labelPosition: 'left',
            validation: validateEmail,
            disabled: true,
          }),
          new Input({
            id: 'login-input',
            name: 'login',
            type: 'text',
            label: 'Логин',
            value: 'ivanivanov',
            labelPosition: 'left',
            validation: validateLogin,
            disabled: true,
          }),
          new Input({
            id: 'first-name-input',
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            value: 'Иван',
            labelPosition: 'left',
            validation: validateName,
            disabled: true,
          }),
          new Input({
            id: 'second-name-input',
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            value: 'Иванов',
            labelPosition: 'left',
            validation: validateName,
            disabled: true,
          }),
          new Input({
            id: 'username-input',
            name: 'username',
            type: 'text',
            label: 'Имя в чате',
            value: 'Иван',
            labelPosition: 'left',
            disabled: true,
          }),
          new Input({
            id: 'phone-input',
            name: 'phone',
            type: 'text',
            label: 'Телефон',
            value: '+7 (909) 967 30 30',
            labelPosition: 'left',
            validation: validatePhone,
            disabled: true,
          }),
        ],
        className: 'profile-page__form',
      }),
      editProfileLink: new Link({
        text: 'Изменить данные',
        onClick: () => {
          globalStorage.state = {
            currentPage: Pages.EditProfile,
          };
        },
      }),
      changePasswordLink: new Link({
        text: 'Изменить пароль',
        onClick: () => {
          globalStorage.state = {
            currentPage: Pages.ChangePassword,
          };
        },
      }),
      quitLink: new Link({
        text: 'Выйти',
        className: 'profile-page__quit-button',
        onClick: () => {
          globalStorage.state = {
            currentPage: Pages.Login,
          };
        },
      }),
      footer: new Footer(),
    });
  }

  protected render() {
    return this.compile(template);
  }
}
