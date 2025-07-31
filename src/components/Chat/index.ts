import Component from '../../services/Component';
import { BaseProps, Nullable, StateSetter } from '../../utils/types';
import Button from '../Button';
import MessageInput from '../MessageInput';
import Userpic from '../Userpic';
import template from './template.hbs?raw';
import arrowIcon from '/src/images/icons/arrow.svg';
import chevronIcon from '/src/images/icons/chevron.svg';
import deleteIcon from '/src/images/icons/delete.svg';
import addUserIcon from '/src/images/icons/add-user.svg';
import removeUserIcon from '/src/images/icons/remove-user.svg';
import { ChatPageMode, ChatPageState } from "../../pages/ChatPage";
import { ChatListResponseDTO } from "../../apis/ChatsAPI";
import Modal from "../Modal";
import Input from "../Input";
import Form from "../Form";
import ChatController from "../../controllers/ChatController";
import UserDeleteList from "../UserDeleteList";
import { RootStore } from "../../main";

interface ChatProps extends BaseProps {
  chat?: Nullable<ChatListResponseDTO>;
  setPageState?: StateSetter<ChatPageState>;
  className?: string;
}

export default class Chat extends Component<ChatProps> {
  constructor(props: ChatProps) {
    const userpic = new Userpic({
      src: '', size: 34,
    });

    const addUserButton = new Button({
      variant: 'text',
      icon: addUserIcon,
      className: 'chat__icon-button',
      onClick: () => addUserModal.props = { isOpen: true },
    });

    const addUserModalTitle = document.createElement('h2');
    addUserModalTitle.className = 'chat__modal-title'
    addUserModalTitle.textContent = 'Добавить пользователя';

    const userSearchInput = new Input({
      label: 'Логин', type: 'text', name: 'login', className: 'chat__modal-input',
    });

    const addUserForm = new Form({
      body: [userSearchInput], buttonText: 'Добавить', className: 'chat__modal-form', onSubmit: async (e) => {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const { login } = Object.fromEntries(formData.entries());

        if (typeof login !== 'string') return;

        // Выбор юзера из результатов поиска не реализован, не хватило времени
        const foundUsers = await ChatController.searchUser({ login });

        if (!foundUsers || !this.props?.chat) return;

        await ChatController.addUserToChat({ users: [foundUsers[0].id], chatId: this.props.chat.id })
        addUserModal.props = { isOpen: false };
      }
    });

    const addUserModal = new Modal({
      body: [addUserModalTitle, addUserForm], isOpen: false, className: 'chat__modal',
    });

    const removeUserButton = new Button({
      variant: 'text',
      icon: removeUserIcon,
      className: 'chat__icon-button',
      onClick: async () => {
        const response = await ChatController.getChatUsers(this.props!.chat!.id);

        if (!response.length) return;

        removeUserModal.props = {
          body: [removeUserModalTitle, new UserDeleteList({ chatId: this.props!.chat!.id, users: response }), removeUserModalButton,],
          isOpen: true
        };
      }
    });

    const removeUserModalTitle = document.createElement('h2');
    removeUserModalTitle.className = 'chat__modal-title'
    removeUserModalTitle.textContent = 'Удалить пользователей';

    const removeUserModalButton = new Button({
      text: 'Готово', onClick: () => {
        removeUserModal.props = { isOpen: false };
      }
    })

    const removeUserModal = new Modal({
      body: [removeUserModalTitle, removeUserModalButton,],
      isOpen: false, className: 'chat__modal',
    });

    const deleteChatButton = new Button({
      variant: 'text', icon: deleteIcon, className: 'chat__icon-button', onClick: async () => {
        await ChatController.deleteChat(this.props!.chat!.id);
        this.props?.setPageState?.((prev) => ({
          selectedChat: null, mode: prev?.mode === ChatPageMode.All ? ChatPageMode.All : ChatPageMode.ChatList,
        }))
      }
    })

    const messageInput = new MessageInput({
      className: 'chat__message-input',
      name: 'message',
    });

    const submitButton = new Button({
      icon: arrowIcon,
      shape: 'circle',
      type: 'submit',
      className: 'chat__submit-button',
    });

    const messageForm = new Form({
      body: [messageInput, submitButton],
      className: 'chat__message-form',
      onSubmit: async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const { message } = Object.fromEntries(formData.entries()) as {
          message: string;
        };

        if (!this.props?.chat?.id || !message.length) return;

        ChatController.sendMessage(this.props.chat.id, message);
        form.reset();
      }
    })

    super({ ...props, addUserButton, userpic, addUserModal, removeUserButton, removeUserModal, deleteChatButton, messageForm });
    RootStore.subscribe((state) => {
      if (this.props?.chat?.id) {
        this.props = { messages: state.messages.get(this.props.chat.id) }
      }
    })
  }

  render() {
    return this.compile(template, {
      backButton: new Button({
        icon: chevronIcon, variant: 'text', className: 'chat__back-button', onClick: () => {
          this.props?.setPageState?.({
            selectedChat: null, mode: ChatPageMode.ChatList,
          })
        },
      }),
    });
  }

  protected async componentDidMount() {
    if (this.props?.chat?.id) {
      await ChatController.connectToChat(this.props.chat.id)
      this.props = { messages: RootStore.state.messages.get(this.props.chat.id) ?? [] }
    }
  }

  protected async componentDidUpdate() {
    if (this.props?.chat?.id) {
      await ChatController.connectToChat(this.props.chat.id)
      this.props = { messages: RootStore.state.messages.get(this.props.chat.id) ?? [] }
    }
  }
}
