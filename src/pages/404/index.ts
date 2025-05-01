import { globalStorage, Pages } from '../../App';
import Footer from '../../components/Footer';
import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface Page404Props extends BaseProps{
  footer: Footer;
  link: Link;
}

export default class Page404 extends Component<Page404Props> {
  constructor() {
    super({
      footer: new Footer(),
      link: new Link({
        text: 'Назад к чатам',
        onClick: () => {
          globalStorage.state = {
            currentPage: Pages.ChatList,
          }
        }
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
