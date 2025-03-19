import Handlebars from 'handlebars';
import Button from "./components/Button";
Handlebars.registerPartial('Button', Button)
export default class App {
  constructor() {
    this.state = {
      currentPage: '',
    };
    this.appElement = document.getElementById('app');
  }

  render() {}
}