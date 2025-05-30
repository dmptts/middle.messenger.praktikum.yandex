import Chat from '../../components/Chat';
import ChatList from '../../components/ChatList';
import { chatsMock } from '../../mocks/chats';
import Component from '../../services/Component';
import { MOBILE_WIDTH } from '../../utils/const';
import { Nullable } from '../../utils/types';
import template from './template.hbs?raw';

export enum ChatPageMode {
  Chat = 'CHAT',
  ChatList = 'CHAT_LIST',
  All = 'ALL',
}

export interface ChatState {
  selectedChat: Nullable<number>;
  mode: ChatPageMode;
}

export default class ChatPage extends Component<never, ChatState> {
  constructor() {
    super();
    this.setState({
      mode: window.innerWidth > MOBILE_WIDTH ? ChatPageMode.All : ChatPageMode.ChatList,
      selectedChat: null,
    })
  }

  render() {
    const list = new ChatList({
      list: chatsMock,
      setPageState: this.setState.bind(this),
      className: 'chat-page__list',
    });

    const chat = new Chat({
      chat: this.state?.selectedChat ? chatsMock.find((chat) => chat.id === this.state!.selectedChat) : null,
      setPageState: this.setState.bind(this),
      className: 'chat-page__chat',
      isMobile: this.state?.mode !== ChatPageMode.All
    });

    return this.compile(template, { list, chat });
  }

  protected componentDidMount() {
    window.addEventListener('resize', this._handleWindowResize.bind(this));
  }

  private _handleWindowResize() {
    if (!this.state) return;

    if (window.innerWidth <= MOBILE_WIDTH && this.state!.mode === ChatPageMode.All) {
      this.setState({ mode: this.state.selectedChat ? ChatPageMode.Chat : ChatPageMode.ChatList });
    } else if (window.innerWidth > MOBILE_WIDTH && this.state.mode !== ChatPageMode.All) {
      this.setState({ mode: ChatPageMode.All })
    }
  }
}
