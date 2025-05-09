import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';

interface UserpicProps extends BaseProps {
  size: number;
  src?: string;
  alt?: string;
  className?: string;
  withChange?: boolean;
}

export default class Userpic extends Component<UserpicProps> {
  constructor(props: UserpicProps) {
    super({ ...props, withChange: props.withChange ?? false });
  }

  protected render() {
    return this.compile(template);
  }
}
