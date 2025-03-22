import * as PageTemplates from './pages';
import Handlebars from 'handlebars';
import Input from './components/Input';
import Button from './components/Button';
import Userpic from "./components/Userpic";
import Badge from "./components/Badge";
import BackButton from "./components/BackButton";
import TempFooter from "./components/TempFooter";

const PAGES = {
  Login: 'Login',
  Registration: 'Registration',
  Profile: 'Profile',
  EditProfile: 'EditProfile',
  ChangePassword: 'ChangePassword',
  NotFoundError: 'NotFoundError',
  ServerError: 'ServerError',
  ChatList: 'ChatList',
  Chat: 'Chat',
}

Handlebars.registerPartial('Button', Handlebars.compile(Button))
Handlebars.registerPartial('Input', Handlebars.compile(Input));
Handlebars.registerPartial('Userpic', Handlebars.compile(Userpic));
Handlebars.registerPartial('Badge', Handlebars.compile(Badge));
Handlebars.registerPartial('BackButton', Handlebars.compile(BackButton));
Handlebars.registerPartial('TempFooter', Handlebars.compile(TempFooter));

export default class App {
  constructor() {
    this.state = {
      currentPage: PAGES.Login,
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    switch (this.state.currentPage) {
      case PAGES.Login:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.LoginPage)();
        break;
      case PAGES.Registration:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.RegistrationPage)();
        break;
      case PAGES.Profile:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ProfilePage)();
        break;
      case PAGES.EditProfile:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.EditProfilePage)();
        break;
      case PAGES.ChangePassword:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ChangePasswordPage)();
        break;
      case PAGES.ChatList:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ChatListPage)();
        break;
      case PAGES.Chat:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ChatPage)();
        break;
      case PAGES.NotFoundError:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.NotFoundErrorPage)();
        break;
      case PAGES.ServerError:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ServerErrorPage)();
        break;
      default:
        break;
    }

    this.attachListeners();
  }

  attachListeners() {
    document.getElementById('login-link').addEventListener('click', this.changePage.bind(this, PAGES.Login));
    document.getElementById('registration-link').addEventListener('click', this.changePage.bind(this, PAGES.Registration));
    document.getElementById('chat-list-link').addEventListener('click', this.changePage.bind(this, PAGES.ChatList));
    document.getElementById('chat-link').addEventListener('click', this.changePage.bind(this, PAGES.Chat));
    document.getElementById('profile-link').addEventListener('click', this.changePage.bind(this, PAGES.Profile));
    document.getElementById('edit-profile-link').addEventListener('click', this.changePage.bind(this, PAGES.EditProfile));
    document.getElementById('change-password-link').addEventListener('click', this.changePage.bind(this, PAGES.ChangePassword));
    document.getElementById('404-link').addEventListener('click', this.changePage.bind(this, PAGES.NotFoundError));
    document.getElementById('500-link').addEventListener('click', this.changePage.bind(this, PAGES.ServerError));
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render()
  }
}
