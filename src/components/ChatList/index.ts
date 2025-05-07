import chevronIcon from '/src/images/icons/chevron.svg';
import { ChatPageMode, chatStorage } from '../../pages/chat';
import Component from '../../services/Component';
import { BaseProps, ChatDto } from '../../utils/types';
import Button from '../Button';
import ChatListItem from '../ChatListItem';
import template from './template.hbs?raw';

interface ChatListProps extends BaseProps {
  list: ChatDto[];
  className?: string;
}

interface InternalChatListProps extends BaseProps {
  list: ChatListItem[];
  className?: string;
}

export default class ChatList extends Component<InternalChatListProps> {
  constructor(props: ChatListProps) {
    const profileButton = new Button({
      text: 'Профиль',
      variant: 'text',
      icon: chevronIcon,
    });
    const list = props.list.map(chat => (new ChatListItem({
      chat,
      onClick: () => {
        chatStorage.state = {
          selectedChat: chat.id,
          mode: chatStorage.state.mode !== ChatPageMode.ChatListAndChat ? ChatPageMode.Chat : ChatPageMode.ChatListAndChat,
        };
      },
    })));
    super({ ...props, profileButton, list });
  }

  protected render(): DocumentFragment {
    return this.compile(template);
  }
}
