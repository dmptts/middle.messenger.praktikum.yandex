import Handlebars from 'handlebars';
import Input from './components/Input';
import Button from "./components/Button";
Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Input', Input);

export default class App {
  constructor() {
    this.state = {
      currentPage: '',
    };
    this.appElement = document.getElementById('app');
  }

  render() {}
}