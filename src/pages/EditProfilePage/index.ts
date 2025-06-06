import BackButton from '../../components/BackButton';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Userpic from '../../components/Userpic';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../utils/validation';
import template from './template.hbs?raw';

interface EditProfilePageProps extends BaseProps {
  userpic: Userpic;
  backButton: BackButton;
  form: Form;
}

export default class EditProfilePage extends Component<EditProfilePageProps> {
  constructor() {
    const emailInput = new Input({
      id: 'email-input',
      name: 'email',
      type: 'text',
      label: 'Почта',
      value: 'pochta@yandex.ru',
      labelPosition: 'left',
      validation: validateEmail,
      onBlur: () => emailInput.validate(),
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
    });

    const usernameInput = new Input({
      id: 'username-input',
      name: 'username',
      type: 'text',
      label: 'Имя в чате',
      value: 'Иван',
      labelPosition: 'left',
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
    });

    super({
      userpic: new Userpic({
        size: 130,
        withChange: true,
        className: 'edit-profile-page__userpic',
      }),
      backButton: new BackButton(),
      form: new Form({
        body: [
          emailInput,
          loginInput,
          firstNameInput,
          secondNameInput,
          usernameInput,
          phoneInput,
        ],
        buttonText: 'Сохранить',
        className: 'edit-profile-page__form',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
