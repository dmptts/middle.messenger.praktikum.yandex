import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface ServerErrorPageProps extends BaseProps {
  link: Link;
}

export default class ServerErrorPage extends Component<ServerErrorPageProps> {
  constructor() {
    super({
      link: new Link({
        text: 'Назад к чатам',
      }),
    });
  }

  protected render() {
    return this.compile(template);
  }
}
