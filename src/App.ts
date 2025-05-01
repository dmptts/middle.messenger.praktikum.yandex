import Page404 from './pages/404';
import LoginPage from './pages/login';
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
      default:
        fragment.content.appendChild(new Page404().element!);
    }

    return fragment.content;
  }

  private _handleStateChange(state: GlobalState) {
    this.props = { currentPage: state.currentPage };
  }
}
