import * as PageTemplates from './pages';
import Handlebars from 'handlebars';
import Input from './components/Input';
import Button from './components/Button';
import Userpic from "./components/Userpic";
import Badge from "./components/Badge";
import BackButton from "./components/BackButton/index.js";

const PAGES = {
  Login: 'Login',
  Registration: 'Registration',
  Profile: 'Profile',
  EditProfile: 'EditProfile',
  ChangePassword: 'ChangePassword',
  NotFoundError: 'NotFoundError',
  ServerError: 'ServerError',
}

Handlebars.registerPartial('Button', Handlebars.compile(Button))
Handlebars.registerPartial('Input', Handlebars.compile(Input));
Handlebars.registerPartial('Userpic', Handlebars.compile(Userpic));
Handlebars.registerPartial('Badge', Handlebars.compile(Badge));
Handlebars.registerPartial('BackButton', Handlebars.compile(BackButton));

export default class App {
  constructor() {
    this.state = {
      currentPage: PAGES.NotFoundError,
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
      case PAGES.NotFoundError:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.NotFoundErrorPage)();
        break;
      case PAGES.ServerError:
        this.appElement.innerHTML = Handlebars.compile(PageTemplates.ServerErrorPage)();
        break;
      default:
        break;
    }
  }
}