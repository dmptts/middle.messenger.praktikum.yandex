import chevronIcon from '/src/images/icons/chevron.svg';
import Component from '../../services/Component';
import { BaseProps, ChatDto, StateSetter } from '../../utils/types';
import ChatListItem from '../ChatListItem';
import template from './template.hbs?raw';
import { ChatPageMode, ChatState } from "../../pages/ChatPage";
import Link from "../Link";
import Button from "../Button";
import { Routes } from "../../App";

interface ChatListProps extends BaseProps {
  list: ChatDto[];
  setPageState?: StateSetter<ChatState>;
  className?: string;
}

export default class ChatList extends Component<ChatListProps> {
  constructor(props: ChatListProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      profileButton: new Link({
        component: new Button({
          text: 'Профиль',
          variant: 'text',
          icon: chevronIcon,
        }),
        to: Routes.Settings,
      }),
      list: this.props?.list.map(chat => (new ChatListItem({
        chat,
        onClick: () => {
          this.props?.setPageState?.((prev) => ({
            selectedChat: chat.id,
            mode: prev?.mode !== ChatPageMode.All ? ChatPageMode.Chat : ChatPageMode.All,
          }));
        },
      }))) ?? [],
    });
  }
}
