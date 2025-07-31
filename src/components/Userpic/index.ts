import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import template from './template.hbs?raw';
import Input from "../Input";
import ProfileController from "../../controllers/ProfileController";

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
    const fileInput = new Input({
      name: 'avatar',
      type: 'file',
      accept: '.jpg,.jpeg,.png,.gif,.webp',
      className: 'userpic__input',
      onChange: async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);
        await ProfileController.changeAvatar(formData)
      }
    });

    return this.compile(template, this.props?.withChange ? { fileInput } : undefined);
  }
}
