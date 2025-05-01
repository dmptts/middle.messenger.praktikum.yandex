import Component, { eventTypesMap } from '../../services/Component';
import { BaseProps, Nullable } from '../../utils/types';
import template from './template.hbs?raw';

interface InputProps extends BaseProps {
  type: string;
  name: string;
  id?: string;
  label?: string;
  value?: string;
  required?: boolean;
  onBlur?: EventListener;
  onClick?: EventListener;
  validation?: (value: string) => Nullable<string>;
}

export default class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  get value() {
    const input = this._element?.querySelector('input');

    if (!input) {
      return '';
    }

    return input.value;
  }

  render() {
    return this.compile(template);
  }

  validate() {
    const input = this._element?.querySelector('input');
    const errorContainer = this.element?.querySelector('.input-component__error');

    if (!input || !errorContainer) {
      return null;
    }

    const error = this.props?.validation?.(input.value.trim()) ?? null;
    errorContainer.textContent = error ?? '';

    return error;
  }

  addEvents() {
    if (!this.element) {
      throw new Error(
        `Элемент еще не создан`,
      );
    }

    const input = this.element.querySelector('input');

    if (!input) {
      return;
    }

    for (const listener in this._listeners) {
      const handler = this._listeners[listener as keyof InputProps];

      if (!handler) {
        return;
      }

      input.addEventListener(
        eventTypesMap[listener as keyof typeof eventTypesMap],
        handler.bind(this),
      );
    }
  }

  removeEvents() {
    const input = this.element?.querySelector('input');

    if (!input || !this._listeners) {
      return;
    }

    for (const listener in this._listeners) {
      input.removeEventListener(
        eventTypesMap[listener as keyof typeof eventTypesMap],
        this._listeners[listener as keyof InputProps]
      );
    }
  }
}
