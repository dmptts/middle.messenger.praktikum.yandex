import {
  ChangePasswordPage,
  ChatPage,
  EditProfilePage,
  LoginPage,
  NotFoundErrorPage,
  ProfilePage,
  RegistrationPage,
  ServerErrorPage,
} from './pages';
import Component from './services/Component';
import Store from './services/Store';
import { BaseProps } from './utils/types';

export const enum Pages {
  Login = 'Login',
  Registration = 'Registration',
  Profile = 'Profile',
  EditProfile = 'EditProfile',
  ChangePassword = 'ChangePassword',
  NotFoundError = 'NotFoundError',
  ServerError = 'ServerError',
  ChatList = 'ChatList',
  Chat = 'Chat',
}

interface GlobalState {
  currentPage: Pages;
}

export const globalStorage = new Store<GlobalState>({
  currentPage: Pages.Login,
});

interface AppProps extends BaseProps {
  currentPage: Pages;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  chatPage: ChatPage;
  profilePage: ProfilePage;
  editProfilePage: EditProfilePage;
  changePasswordPage: ChangePasswordPage;
  notFoundErrorPage: NotFoundErrorPage;
  serverErrorPage: ServerErrorPage;
}

export default class App extends Component<AppProps> {
  constructor() {
    super({
      currentPage: globalStorage.state.currentPage,
      loginPage: new LoginPage(),
      registrationPage: new RegistrationPage(),
      profilePage: new ProfilePage(),
      editProfilePage: new EditProfilePage(),
      changePasswordPage: new ChangePasswordPage(),
      chatPage: new ChatPage(),
      notFoundErrorPage: new NotFoundErrorPage(),
      serverErrorPage: new ServerErrorPage(),
    });

    globalStorage.subscribe(this._handleStateChange.bind(this));
  }

  render() {
    const fragment = document.createElement('template');

    if (!this.props) {
      throw new Error();
    }

    switch (globalStorage.state.currentPage) {
      case Pages.Login:
        fragment.content.appendChild(this.props.loginPage.element!);
        break;
      case Pages.Registration:
        fragment.content.appendChild(this.props.registrationPage.element!);
        break;
      case Pages.Profile:
        fragment.content.appendChild(this.props.profilePage.element!);
        break;
      case Pages.EditProfile:
        fragment.content.appendChild(this.props.editProfilePage.element!);
        break;
      case Pages.ChangePassword:
        fragment.content.appendChild(this.props.changePasswordPage.element!);
        break;
      case Pages.Chat:
        fragment.content.appendChild(this.props.chatPage.element!);
        break;
      case Pages.ServerError:
        fragment.content.appendChild(this.props.serverErrorPage.element!);
        break;
      default:
        fragment.content.appendChild(this.props.notFoundErrorPage.element!);
    }

    return fragment.content;
  }

  private _handleStateChange(state: GlobalState) {
    this.props = { currentPage: state.currentPage };
  }
}
