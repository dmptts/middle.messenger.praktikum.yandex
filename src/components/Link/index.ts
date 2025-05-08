import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface LinkProps extends BaseProps {
  text: string;
  id?: string;
  className?: string;
  onClick?: EventListener;
}

export default class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template);
  }
}
