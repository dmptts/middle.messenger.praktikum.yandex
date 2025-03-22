import * as PageTemplates from './pages';
import Handlebars from 'handlebars';
import Input from './components/Input';
import Button from "./components/Button";
import Userpic from "./components/Userpic";

const PAGES = {
  Login: 'Login',
  Registration: 'Registration',
}

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Userpic', Handlebars.compile(Userpic));

export default class App {
  constructor() {
    this.state = {
      currentPage: PAGES.Registration,
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
      default:
        break;
    }
  }
}