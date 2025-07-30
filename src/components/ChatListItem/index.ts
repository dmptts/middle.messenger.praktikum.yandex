import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import Userpic from '../Userpic';
import template from './template.hbs?raw';
import { ChatListResponseDTO } from "../../apis/ChatsAPI";

interface ChatListItemProps extends BaseProps {
  chat: ChatListResponseDTO;
  onClick: EventListener;
  isSelected?: boolean;
}

export default class ChatListItem extends Component<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({
      chat: props.chat,
      onClick: props.onClick,
      isSelected: props.isSelected ?? false,
    });
  }

  render() {
    return this.compile(template, {
      userpic: new Userpic({
        size: 47,
        src: this.props?.chat.avatar,
        className: 'ChatPage-list-item__userpic'
      }),
    });
  }
}
