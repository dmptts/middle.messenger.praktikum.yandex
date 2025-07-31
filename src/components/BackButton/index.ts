import arrowIcon from '/src/images/icons/arrow.svg';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import Badge from '../Badge';
import template from './template.hbs?raw';

interface BackButtonProps extends BaseProps {
  className?: string;
  onClick?: () => void;
}

export default class BackButton extends Component<BackButtonProps> {
  constructor(props?: BackButtonProps) {
    super(props);
  }

  protected render() {
    const badge = new Badge({
      size: 24,
      icon: arrowIcon,
    });

    return this.compile(template, { badge });
  }
}
