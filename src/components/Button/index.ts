import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from "./template.hbs?raw";

interface ButtonProps extends BaseProps {
  text: string;
  onClick?: EventListener;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}

export default class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      type: props.type ?? 'button',
    });
  }

  render() {
    return this.compile(template);
  }
}
