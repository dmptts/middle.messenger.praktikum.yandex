import { globalStorage, Pages } from '../../App';
import Footer from '../../components/Footer';
import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface ServerErrorPageProps extends BaseProps {
  footer: Footer;
  link: Link;
}

export default class ServerErrorPage extends Component<ServerErrorPageProps> {
  constructor() {
    super({
      footer: new Footer(),
      link: new Link({
        text: 'Назад к чатам',
        onClick: () => {
          globalStorage.state = {
            currentPage: Pages.ChatList,
          };
        },
      }),
    });
  }

  protected render() {
    return this.compile(template);
  }
}
