import * as PageTemplates from './pages';
import Handlebars from 'handlebars';
import Input from './components/Input';
import Button from './components/Button';
import Userpic from "./components/Userpic";
import Badge from "./components/Badge";
import BackButton from "./components/BackButton";
import TempFooter from "./components/TempFooter";

const enum Pages {
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

Handlebars.registerPartial('Button', Handlebars.compile(Button))
Handlebars.registerPartial('Input', Handlebars.compile(Input));
Handlebars.registerPartial('Userpic', Handlebars.compile(Userpic));
Handlebars.registerPartial('Badge', Handlebars.compile(Badge));
Handlebars.registerPartial('BackButton', Handlebars.compile(BackButton));
Handlebars.registerPartial('TempFooter', Handlebars.compile(TempFooter));

type State = {
  currentPage: Pages;
}

export default class App {
  private state: State;
  private appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: Pages.Login,
    };

    const targetElement = document.getElementById('app');

    if (!targetElement) {
      throw new Error('App element not found');
    }

    this.appElement = targetElement;
  }

  render() {
    switch (this.state.currentPage) {
      case Pages.Login:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.LoginPage)({});
        break;
      case Pages.Registration:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.RegistrationPage)({});
        break;
      case Pages.Profile:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ProfilePage)({});
        break;
      case Pages.EditProfile:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.EditProfilePage)({});
        break;
      case Pages.ChangePassword:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ChangePasswordPage)({});
        break;
      case Pages.ChatList:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ChatListPage)({});
        break;
      case Pages.Chat:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ChatPage)({});
        break;
      case Pages.NotFoundError:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.NotFoundErrorPage)({});
        break;
      case Pages.ServerError:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ServerErrorPage)({});
        break;
      default:
        break;
    }

    this.attachListeners();
  }

  attachListeners() {
    document.getElementById('login-link')?.addEventListener('click', this.changePage.bind(this, Pages.Login));
    document.getElementById('registration-link')?.addEventListener('click', this.changePage.bind(this, Pages.Registration));
    document.getElementById('chat-list-link')?.addEventListener('click', this.changePage.bind(this, Pages.ChatList));
    document.getElementById('chat-link')?.addEventListener('click', this.changePage.bind(this, Pages.Chat));
    document.getElementById('profile-link')?.addEventListener('click', this.changePage.bind(this, Pages.Profile));
    document.getElementById('edit-profile-link')?.addEventListener('click', this.changePage.bind(this, Pages.EditProfile));
    document.getElementById('change-password-link')?.addEventListener('click', this.changePage.bind(this, Pages.ChangePassword));
    document.getElementById('404-link')?.addEventListener('click', this.changePage.bind(this, Pages.NotFoundError));
    document.getElementById('500-link')?.addEventListener('click', this.changePage.bind(this, Pages.ServerError));
  }

  changePage(page: Pages) {
    this.state.currentPage = page;
    this.render()
  }
}
