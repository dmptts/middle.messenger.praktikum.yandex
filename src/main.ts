import Handlebars from 'handlebars';
import App from './App';
import Store, { Action } from "./services/Store";
import { ChatListResponseDTO } from "./apis/ChatsAPI";
import { UserDto } from "./apis/AuthAPI";
import { Nullable } from "./utils/types";
import { SendMessageResponseDTO } from "./controllers/ChatController";

Handlebars.registerHelper('ifEquals', function(this: Record<string, unknown>, arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
})

interface RootState {
  count: number;
  chats: ChatListResponseDTO[];
  currentUser: Nullable<UserDto>;
  messages: Map<number, SendMessageResponseDTO[]>;
}

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'signIn':
      return state;
    case 'user/set':
      return { ...state, currentUser: action.payload };
    case 'chats/set':
      return { ...state, chats: action.payload }
    case 'messages/add': {
      const existingMessages = state.messages.get(action.payload.chatId) || [];
      const updatedMessages = [...action.payload.messages, ...existingMessages];

      const newMessages = new Map(state.messages);
      newMessages.set(action.payload.chatId, updatedMessages);

      return { ...state, messages: newMessages };
    }

    default:
      return state;
  }
}

export const RootStore = new Store<RootState>(reducer, {
  count: 0,
  chats: [],
  currentUser: null,
  messages: new Map<number, SendMessageResponseDTO[]>(),
})

window.addEventListener('DOMContentLoaded', () => new App());
