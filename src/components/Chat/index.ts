import Component from '../../services/Component';
import { BaseProps, ChatDto, Nullable, StateSetter } from '../../utils/types';
import Button from '../Button';
import MessageInput from '../MessageInput';
import Userpic from '../Userpic';
import template from './template.hbs?raw';
import arrowIcon from '/src/images/icons/arrow.svg';
import chevronIcon from '/src/images/icons/chevron.svg';
import { ChatPageMode, ChatState } from "../../pages/ChatPage";

interface ChatProps extends BaseProps {
  chat?: Nullable<ChatDto>;
  isMobile?: boolean;
  setPageState?: StateSetter<ChatState>;
  className?: string;
}

export default class Chat extends Component<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      userpic: new Userpic({
        src: '',
        size: 34,
      }),
      backButton: new Button({
        icon: chevronIcon,
        variant: 'text',
        className: 'chat__back-button',
        onClick: () => {
          this.props?.setPageState?.({
            selectedChat: null,
            mode: ChatPageMode.ChatList,
          })
        },
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
  }
}
