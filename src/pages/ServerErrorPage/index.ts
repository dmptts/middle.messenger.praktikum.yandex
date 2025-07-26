import Link from '../../components/Link';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';
import { Routes } from "../../App";

interface ServerErrorPageProps extends BaseProps {
  link: Link;
}

export default class ServerErrorPage extends Component<ServerErrorPageProps> {
  constructor() {
    super({
      link: new Link({
        text: 'Назад к чатам',
        to: Routes.Messenger,
      }),
    });
  }

  protected render() {
    return this.compile(template);
  }
}
