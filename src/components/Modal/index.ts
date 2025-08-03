import Component from "../../services/Component";
import { BaseProps } from "../../utils/types";
import template from './template.hbs?raw';

interface ModalProps extends BaseProps {
  body: Array<HTMLElement | Component<BaseProps, object>>;
  isOpen?: boolean;
}

export default class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props, onClick: (e: Event) => {
        if (e.target === e.currentTarget) {
          this.props = { isOpen: false }
        }
      }
    });
  }

  protected render() {
    return this.compile(template);
  }
}
