import Page404 from './pages/404';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegistrationPage from './pages/registration';
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
  currentPage: Pages.Profile,
});

interface AppProps extends BaseProps {
  currentPage: Pages;
}

export default class App extends Component<AppProps> {
  constructor() {
    super({
      currentPage: globalStorage.state.currentPage,
    });

    globalStorage.subscribe(this._handleStateChange.bind(this));
  }

  render() {
    const fragment = document.createElement('template');

    switch (globalStorage.state.currentPage) {
      case Pages.Login:
        fragment.content.appendChild(new LoginPage().element!);
        break;
      case Pages.Registration:
        fragment.content.appendChild(new RegistrationPage().element!);
        break;
      case Pages.Profile:
        fragment.content.appendChild(new ProfilePage().element!);
        break;
      case Pages.EditProfile:
      case Pages.ChangePassword:
      case Pages.ChatList:
      case Pages.Chat:
      case Pages.ServerError:
      default:
        fragment.content.appendChild(new Page404().element!);
    }

    return fragment.content;
  }

  private _handleStateChange(state: GlobalState) {
    this.props = { currentPage: state.currentPage };
  }
}
