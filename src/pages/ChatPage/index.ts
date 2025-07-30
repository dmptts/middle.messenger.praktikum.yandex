import Chat from '../../components/Chat';
import ChatList from '../../components/ChatList';
import Component from '../../services/Component';
import { MOBILE_WIDTH } from '../../utils/const';
import { Nullable } from '../../utils/types';
import template from './template.hbs?raw';
import { connect } from "../../services/Store";
import { RootStore } from "../../main";
import ChatController from "../../controllers/ChatController";

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
  constructor() {
    super();
    this.setState({
      mode: window.innerWidth > MOBILE_WIDTH ? ChatPageMode.All : ChatPageMode.ChatList,
      selectedChat: null,
    });
    RootStore.subscribe(state => this.props = { chats: state.chats });
  }

  render() {
    const list = new ChatList({
      list: RootStore.state.chats ?? [],
      setPageState: this.setState.bind(this),
      selectedChat: this.state?.selectedChat ?? undefined,
      className: 'chat-page__list',
    });

    const chat = new Chat({
      chat: this.state?.selectedChat ? RootStore.state.chats.find((chat) => chat.id === this.state!.selectedChat) : null,
      setPageState: this.setState.bind(this),
      className: 'chat-page__chat',
      isMobile: this.state?.mode !== ChatPageMode.All
    });

    return this.compile(template, { list, chat });
  }

  protected async componentDidMount() {
    window.addEventListener('resize', this._handleWindowResize.bind(this));
    await ChatController.getChats()
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
