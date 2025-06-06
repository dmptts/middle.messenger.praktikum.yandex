import Component from '../../services/Component';
import { BaseProps, Nullable } from '../../utils/types';
import Button from '../Button';
import Input from '../Input';
import template from './template.hbs?raw';

interface FormProps extends BaseProps {
  body: Component<BaseProps>[];
  buttonText?: Nullable<string>;
  className?: string;
}

interface InternalFormProps extends BaseProps {
  body: Component<BaseProps>[];
  button: Nullable<Button>;
  className?: string;
}

export default class Form extends Component<InternalFormProps> {
  constructor(props: FormProps) {
    const submitButton = props.buttonText ? new Button({
      text: props.buttonText,
      type: 'submit',
      className: props.className ? `${props.className}-submit` : '',
    }) : null;

    super({
      body: props.body,
      button: submitButton,
      className: props.className,
    });

    this.props = {
      onSubmit: this._handleSubmit.bind(this),
    }
  }

  protected render() {
    return this.compile(template)
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

  private _handleSubmit(e: Event) {
    e.preventDefault();

    if (!this._validate()) {
      return;
    }

    const form = e.target;

    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      console.log(Object.fromEntries(formData.entries()));
    }
  }
}
