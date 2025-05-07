import arrowIcon from '/src/images/icons/arrow.svg';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import Badge from '../Badge';
import template from './template.hbs?raw';

interface BackButtonProps extends BaseProps {
  className?: string;
}

interface InternalBackButtonProps extends BackButtonProps {
  badge: Badge;
}

export default class BackButton extends Component<InternalBackButtonProps> {
  constructor(props?: BackButtonProps) {
    super({
      ...props,
      badge: new Badge({
        size: 24,
        icon: arrowIcon,
      }),
    });
  }

  protected render() {
    return this.compile(template);
  }
}
