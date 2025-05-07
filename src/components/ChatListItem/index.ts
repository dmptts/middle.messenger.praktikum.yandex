import { ChatState, chatStorage } from '../../pages/chat';
import Component from '../../services/Component';
import { BaseProps, ChatDto } from '../../utils/types';
import Userpic from '../Userpic';
import template from './template.hbs?raw';

interface ChatListItemProps extends BaseProps {
  chat: ChatDto;
  onClick: EventListener;
  isSelected?: boolean;
}

interface InternalChatListItemProps extends BaseProps {
  id: number;
  userpic: Userpic;
  onClick: EventListener;
  title: string;
  content: string;
  isSelected: boolean;
}

export default class ChatListItem extends Component<InternalChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({
      id: props.chat.id,
      userpic: new Userpic({
        size: 47,
        src: props.chat.avatar,
        className: 'chat-list-item__userpic'
      }),
      onClick: props.onClick,
      title: props.chat.title,
      content: props.chat.last_message.content,
      isSelected: props.isSelected ?? false,
    });

    chatStorage.subscribe(this._handleStateChange.bind(this));
  }

  render() {
    return this.compile(template);
  }

  private _handleStateChange(state: ChatState) {
    if (!this.props) return;

    const chatId = this.props.id;
    this.props = {
      isSelected: state.selectedChat === chatId,
    };
  }
}
