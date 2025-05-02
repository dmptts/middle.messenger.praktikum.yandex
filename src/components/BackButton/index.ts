import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import Badge from '../Badge';
import template from './template.hbs?raw';
import arrowIcon from '../../images/icon-arrow.svg?raw'

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
        content: arrowIcon,
      }),
    });
  }

  protected render() {
    return this.compile(template);
  }
}
