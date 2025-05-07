import { globalStorage, Pages } from '../../App';
import Footer from '../../components/Footer';
import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface NotFoundErrorPageProps extends BaseProps {
  footer: Footer;
  link: Link;
}

export default class NotFoundErrorPage extends Component<NotFoundErrorPageProps> {
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

  render() {
    return this.compile(template);
  }
}
