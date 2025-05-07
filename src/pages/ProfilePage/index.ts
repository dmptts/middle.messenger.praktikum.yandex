import { globalStorage, Pages } from '../../App';
import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Link from '../../components/Link';
import Userpic from '../../components/Userpic';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface ProfilePageProps extends BaseProps {
  userpic: Userpic;
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
