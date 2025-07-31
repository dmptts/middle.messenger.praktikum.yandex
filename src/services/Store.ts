import EventBus from './EventBus';
import { BaseProps, Nullable } from "../utils/types";
import { ComponentConstructor } from "./Component";
import { RootStore } from "../main";
import { ChatListResponseDTO } from "../apis/ChatsAPI";
import { UserDto } from "../apis/AuthAPI";
import { SendMessageResponseDTO } from "../controllers/ChatController";

export type Action =
  | { type: 'signIn' }
  | { type: 'user/set'; payload: Nullable<UserDto> }
  | { type: 'chats/set'; payload: ChatListResponseDTO[] }
  | { type: 'messages/add'; payload: { chatId: number; messages: SendMessageResponseDTO[] } };

enum StoreEvents {
  Updated = "UPDATED",
}

type EventListeners<T> = {
  [StoreEvents.Updated]: [T];
}

export const connect = <P extends BaseProps>(
  component: ComponentConstructor<P>,
  mapStateToProps: (state: typeof RootStore.state) => Partial<typeof RootStore.state>
): ComponentConstructor<P> => {
  return class extends component {
    constructor(props?: P) {

      super(props);
      this.props = { ...mapStateToProps(RootStore.state) };

      RootStore.subscribe((state) => {
        this.props = { ...props, ...mapStateToProps(state) };
      });
    }

    render() {
      return super.render();
    }
  };
}

export default class Store<T> {
  private _state: T;
  private readonly _reducer: (state: T, action: Action) => T;
  private _bus: EventBus<EventListeners<T>>;

  constructor(reducer: (state: T, action: Action) => T, initialState: T) {
    this._bus = new EventBus<EventListeners<T>>();
    this._state = initialState;
    this._reducer = reducer;
  }

  get state() {
    return this._state;
  }

  subscribe(fn: (state: T) => void) {
    this._bus.on(StoreEvents.Updated, fn);
  }

  dispatch(action: Action) {
    this._state = this._reducer(this._state, action);
    this._bus.emit(StoreEvents.Updated, this._state);
  }
}

