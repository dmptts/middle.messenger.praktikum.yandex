import Chat from '../../components/Chat';
import ChatList from '../../components/ChatList';
import { chatsMock } from '../../mocks/chats';
import Component from '../../services/Component';
import Store from '../../services/Store';
import { MOBILE_WIDTH } from '../../utils/const';
import { BaseProps, Nullable } from '../../utils/types';
import template from './template.hbs?raw';

export enum ChatPageMode {
  Chat = 'CHAT',
  ChatList = 'CHAT_LIST',
  ChatListAndChat = 'DESKTOP',
}

export interface ChatState {
  selectedChat: Nullable<number>;
  mode: ChatPageMode;
}

export const chatStorage = new Store<ChatState>({
  selectedChat: null,
  mode: window.innerWidth > MOBILE_WIDTH ? ChatPageMode.ChatListAndChat : ChatPageMode.ChatList,
});

interface ChatStateProps extends BaseProps {
  list: ChatList;
  chat: Chat;
  isChat: boolean;
  isChatList: boolean;
  isDesktop: boolean;
}

export default class ChatPage extends Component<ChatStateProps> {
  constructor() {
    const list = new ChatList({
      list: chatsMock,
      className: 'chat-page__list',
    });

    const chat = new Chat({
      className: 'chat-page__chat',
      isMobile: chatStorage.state.mode !== ChatPageMode.ChatListAndChat
    });

    super({
      list,
      chat,
      isChat: chatStorage.state.mode === ChatPageMode.Chat,
      isChatList: chatStorage.state.mode === ChatPageMode.ChatList,
      isDesktop: chatStorage.state.mode === ChatPageMode.ChatListAndChat,
    });

    chatStorage.subscribe(this._handleStateChange.bind(this));
  }

  render() {
    return this.compile(template);
  }

  protected componentDidMount() {
    window.addEventListener('resize', this._handleWindowResize.bind(this));
  }

  private _handleWindowResize() {
    if (window.innerWidth <= MOBILE_WIDTH && chatStorage.state.mode === ChatPageMode.ChatListAndChat) {
      chatStorage.state = {
        mode: chatStorage.state.selectedChat ? ChatPageMode.Chat : ChatPageMode.ChatList,
      };
    } else if (window.innerWidth > MOBILE_WIDTH && chatStorage.state.mode !== ChatPageMode.ChatListAndChat) {
      chatStorage.state = {
        mode: ChatPageMode.ChatListAndChat,
      };
    }
  }

  private _handleStateChange(state: ChatState) {
    this.props = {
      isChat: state.mode === ChatPageMode.Chat,
      isChatList: state.mode === ChatPageMode.ChatList,
      isDesktop: state.mode === ChatPageMode.ChatListAndChat,
    };

    if (!this.props) return;

    this.props.chat.props = {
      chat: chatsMock.find((chatMock) => chatMock.id === state.selectedChat),
    }
  }
}
