import Chat from '../../components/Chat';
import ChatList from '../../components/ChatList';
import Component from '../../services/Component';
import { MOBILE_WIDTH } from '../../utils/const';
import { Nullable } from '../../utils/types';
import template from './template.hbs?raw';
import { connect } from "../../services/Store";
import { RootStore } from "../../main";
import ChatController from "../../controllers/ChatController";
import AuthController from "../../controllers/AuthController";

export enum ChatPageMode {
  Chat = 'CHAT',
  ChatList = 'CHAT_LIST',
  All = 'ALL',
}

export interface ChatPageState {
  selectedChat: Nullable<number>;
  mode: ChatPageMode;
}

class ChatPage extends Component<never, ChatPageState> {
  private readonly chat: Chat;
  constructor() {
    super();
    this.setState({
      mode: window.innerWidth > MOBILE_WIDTH ? ChatPageMode.All : ChatPageMode.ChatList,
      selectedChat: null,
    });

    this.chat = new Chat({
      chat: this.state?.selectedChat ? RootStore.state.chats.find((chat) => chat.id === this.state!.selectedChat) : null,
      setPageState: this.setState.bind(this),
      className: 'chat-page__chat',
      isMobile: this.state?.mode !== ChatPageMode.All
    });
    this.props = { chat: this.chat }

    RootStore.subscribe(state => this.props = { chats: state.chats });
  }

  render() {
    const list = new ChatList({
      list: RootStore.state.chats ?? [],
      setPageState: this.setState.bind(this),
      selectedChat: this.state?.selectedChat ?? undefined,
      className: 'chat-page__list',
    });

    return this.compile(template, { list });
  }

  protected async componentDidMount() {
    window.addEventListener('resize', this._handleWindowResize.bind(this));
    await AuthController.getUser();
    await ChatController.getChats();
  }

  protected async componentDidUpdate() {
    if (this.chat) {
      this.chat.props = {
        chat: this.state?.selectedChat
          ? RootStore.state.chats.find((chat) => chat.id === this.state!.selectedChat)
          : null
      }
    }
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

export default connect(ChatPage, (state) => ({ chats: state.chats }));
