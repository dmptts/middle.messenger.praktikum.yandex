import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface NotFoundErrorPageProps extends BaseProps {
  link: Link;
}

export default class NotFoundErrorPage extends Component<NotFoundErrorPageProps> {
  constructor() {
    super({
      link: new Link({
        text: 'Назад к чатам',
        to: '/messenger',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
