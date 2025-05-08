import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Userpic from '../../components/Userpic';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import { validatePassword, validatePasswordConfirmation } from '../../utils/validation';
import template from './template.hbs?raw';

interface ChangePasswordPageProps extends BaseProps {
  userpic: Userpic;
  form: Form;
  backButton: BackButton;
  footer: Footer;
}

export default class ChangePasswordPage extends Component<ChangePasswordPageProps> {
  constructor() {
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

    super({
      userpic: new Userpic({
        size: 130,
        withChange: true,
        className: 'change-password-page__userpic',
      }),
      backButton: new BackButton(),
      form: new Form({
        body: [
          oldPasswordInput,
          passwordInput,
          passwordConfirmationInput,
        ],
        buttonText: 'Сохранить',
        className: 'change-password-page__form',
      }),
      footer: new Footer(),
    });
  }

  render() {
    return this.compile(template);
  }
}
