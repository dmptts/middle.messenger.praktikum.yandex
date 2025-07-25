import Component from '../../services/Component';
import { BaseProps, Nullable } from '../../utils/types';
import Button from '../Button';
import Input from '../Input';
import template from './template.hbs?raw';

interface FormProps extends BaseProps {
  body: Component<BaseProps>[];
  buttonText?: Nullable<string>;
  onSubmit?: EventListener;
  className?: string;
}

export default class Form extends Component<FormProps> {
  constructor(props: FormProps) {
    super({
      ...props,
      onSubmit: (e) => {
        e.preventDefault();

        if (!this._validate()) {
          return;
        }

        props.onSubmit?.(e)
      }
    });
  }

  protected render() {
    return this.props?.buttonText ? this.compile(template, {
      button: new Button({
        text: this.props.buttonText,
        type: 'submit',
        className: this.props?.className ? `${this.props.className}-submit` : '',
      })
    }) : this.compile(template);
  }

  private _validate() {
    const inputs: Input[] = [];

    Object.values(this._children ?? {}).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach(c => {
          if (c instanceof Input) {
            inputs.push(c);
          }
        });
      } else {
        if (child instanceof Input) {
          inputs.push(child);
        }
      }
    });

    const results = inputs.map((input) => input.validate());

    return results.every((input) => input === null);
  }
}
