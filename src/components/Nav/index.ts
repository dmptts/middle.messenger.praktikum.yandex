import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import Link from '../Link';
import template from './template.hbs?raw';

interface NavProps extends BaseProps {
  links: Link[];
}

export default class Nav extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
  }

  render() {
    return this.compile(template);
  }
}
