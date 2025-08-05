import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';
import { Router } from "../../services/Router";

interface LinkProps extends BaseProps {
  to: string;
  text?: string;
  component?: Component<BaseProps, object>;
  id?: string;
  className?: string;
}

export default class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      onClick: (e: Event) => {
        e?.preventDefault();
        Router.getInstance().go(props.to ?? '');
      }
    });
  }

  render() {
    return this.compile(template);
  }
}
