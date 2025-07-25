import Handlebars from 'handlebars';
import App from './App';
import Store, { Action } from "./services/Store";
import { ChatListResponseDTO } from "./apis/ChatsAPI";
import { UserDto } from "./apis/AuthAPI";
import { Nullable } from "./utils/types";

Handlebars.registerHelper('ifEquals', function(this: Record<string, unknown>, arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
})

interface RootState {
  count: number;
  chats: ChatListResponseDTO[];
  currentUser: Nullable<UserDto>;
}

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'signIn':
      return state;
    case 'user/set':
      return { ...state, currentUser: action.payload };
    case 'chats/setAll':
      return { ...state, chats: action.payload }
    default:
      return state;
  }
}

export const RootStore = new Store<RootState>(reducer, {
  count: 0,
  chats: [],
  currentUser: null,
})

window.addEventListener('DOMContentLoaded', () => new App());
