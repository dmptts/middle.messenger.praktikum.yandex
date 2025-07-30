import Component from "../../services/Component";
import { ChatUserResponseDTO } from "../../apis/ChatsAPI";
import { BaseProps } from "../../utils/types";
import Button from "../Button";
import deleteIcon from '/src/images/icons/delete.svg';
import template from './template.hbs?raw';

interface UserDeleteListItemProps extends BaseProps {
  user: ChatUserResponseDTO;
  setListState: (id: number) => void;
}

export default class UserDeleteListItem extends Component<UserDeleteListItemProps> {
  constructor(props: UserDeleteListItemProps) {
    const name = props.user.display_name
      ? props.user.display_name
      : `${props.user.first_name}${props.user.second_name ? ` ${props.user.second_name}` : ''}`

    const button = new Button({
      variant: 'text',
      icon: deleteIcon,
      className: 'chat__icon-button',
      onClick: () => props.setListState(props.user.id),
    })

    super({ ...props, name, button });
  }

  protected render(): DocumentFragment {
    return this.compile(template);
  }
}
