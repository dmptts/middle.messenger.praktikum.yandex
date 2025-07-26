import Link from '../../components/Link';
import Component from '../../services/Component';
import template from './template.hbs?raw';

export default class NotFoundErrorPage extends Component {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {
      link: new Link({
        text: 'Назад к чатам',
        to: '/messenger',
      }),
    });
  }
}
