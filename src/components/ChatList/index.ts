import chevronIcon from '/src/images/icons/chevron.svg';
import Component from '../../services/Component';
import { BaseProps, StateSetter } from '../../utils/types';
import ChatListItem from '../ChatListItem';
import template from './template.hbs?raw';
import { ChatPageMode, ChatPageState } from "../../pages/ChatPage";
import Link from "../Link";
import Button from "../Button";
import { Routes } from "../../App";
import { ChatListResponseDTO } from "../../apis/ChatsAPI";
import Modal from "../Modal";
import Input from "../Input";
import Form from "../Form";
import ChatController from "../../controllers/ChatController";

interface ChatListProps extends BaseProps {
  list: ChatListResponseDTO[];
  selectedChat?: number;
  setPageState?: StateSetter<ChatPageState>;
  className?: string;
}

export default class ChatList extends Component<ChatListProps> {
  constructor(props: ChatListProps) {
    const newChatButton = new Button({
      text: 'Новый чат',
      variant: 'text',
      onClick: () => newChatModal.props = { isOpen: true }
    });

    const newChatModalTitle = document.createElement('h2');
    newChatModalTitle.className = 'chat-list__modal-title'
    newChatModalTitle.textContent = 'Добавить пользователя';

    const newChatTitleInput = new Input({
      label: 'Название чата',
      type: 'text',
      name: 'title',
      className: 'chat-list__modal-input',
    })

    const newChatForm = new Form({
      body: [newChatTitleInput],
      buttonText: 'Создать',
      className: 'chat-list__modal-form',
      onSubmit: async (e) => {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const { title } = Object.fromEntries(formData.entries());

        if (typeof title !== 'string') return;
        await ChatController.createNewChat(title);
        newChatModal.props = { isOpen: false }
      }
    })

    const newChatModal = new Modal({
      body: [newChatModalTitle, newChatForm],
      isOpen: false,
    })

    super({ ...props, newChatButton, newChatModal });
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
        isSelected: chat.id === this.props?.selectedChat
      }))) ?? [],
    });
  }
}
