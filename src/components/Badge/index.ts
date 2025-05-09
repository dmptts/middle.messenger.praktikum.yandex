import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface BadgeProps extends BaseProps{
  size: number;
  text?: string;
  icon?: string;
  className?: string;
}

export default class Badge extends Component<BadgeProps> {
  constructor(props: BadgeProps) {
    super(props);
  }

  protected render() {
    return this.compile(template);
  }
}
