import { ChatPageMode, ChatState, chatStorage } from '../../pages/chat';
import Component from '../../services/Component';
import { BaseProps, ChatDto } from '../../utils/types';
import Button from '../Button';
import MessageInput from '../MessageInput';
import Userpic from '../Userpic';
import template from './template.hbs?raw';
import arrowIcon from '/src/images/icons/arrow.svg';
import chevronIcon from '/src/images/icons/chevron.svg';

interface ChatProps extends BaseProps {
  chat?: ChatDto;
  isMobile?: boolean;
  className?: string;
}

export default class Chat extends Component<ChatProps> {
  constructor(props: ChatProps) {
    super({
      ...props,
      userpic: new Userpic({
        src: '',
        size: 34,
      }),
      button: new Button({
        text: 'Назад',
        onClick: () => {
          chatStorage.state = {
            selectedChat: null,
            mode: ChatPageMode.ChatList,
          };
        },
      }),
      backButton: new Button({
        icon: chevronIcon,
        variant: 'text',
        className: 'chat__back-button',
        onClick: () => chatStorage.state = {
          selectedChat: null,
          mode: ChatPageMode.ChatList,
        }
      }),
      messageInput: new MessageInput({
        className: 'chat__message-input',
        name: 'message',
      }),
      submitButton: new Button({
        icon: arrowIcon,
        shape: 'circle',
        className: 'chat__submit-button',
      })
    });

    chatStorage.subscribe(this._handleStateChange.bind(this));
  }

  render() {
    return this.compile(template);
  }

  private _handleStateChange(state: ChatState) {
    this.props = {
      isMobile: state.mode !== ChatPageMode.ChatListAndChat,
    }
  }
}
