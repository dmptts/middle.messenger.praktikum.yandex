import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface MessageInputProps extends BaseProps {
  name?: string;
  className?: string;
  onInput?: EventListener;
}

export default class MessageInput extends Component<MessageInputProps> {
  constructor(props: MessageInputProps) {
    super(props);
    this.props = {
      onInput: this._handleInput.bind(this)
    }
  }

  render() {
    return this.compile(template);
  }

  private _handleInput(e: Event) {
    const target = e.target;
    if (target instanceof HTMLTextAreaElement) {
      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 'px';
    }
  }
}
