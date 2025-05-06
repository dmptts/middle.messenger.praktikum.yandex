import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from "./template.hbs?raw";

interface ButtonProps extends BaseProps {
  text?: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  shape?: 'default' | 'circle';
  variant?: 'default' | 'text';
  className?: string;
  disabled?: boolean;
  onClick?: EventListener;
}

export default class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      type: props.type ?? 'button',
      shape: props.shape ?? 'default',
    });
  }

  render() {
    return this.compile(template);
  }
}
