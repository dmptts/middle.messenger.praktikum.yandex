import * as PageTemplates from './pages';
import Handlebars from 'handlebars';
import Input from './components/Input';
import Button from "./components/Button";

const PAGES = {
  Login: 'Login',
}

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Input', Input);

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
      default:
        break;
    }
  }
}