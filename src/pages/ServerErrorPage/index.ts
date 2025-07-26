import Link from '../../components/Link';
import Component from '../../services/Component';
import template from './template.hbs?raw';
import { Routes } from "../../App";

export default class ServerErrorPage extends Component {
  constructor() {
    super();
  }

  protected render() {
    return this.compile(template, {
      link: new Link({
        text: 'Назад к чатам',
        to: Routes.Messenger,
      }),
    });
  }
}
