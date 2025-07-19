import EventBus from './EventBus';
import { Indexed } from "../utils/types";

export type Action = { type: string, payload?: Indexed };

enum StoreEvents {
  Updated = "UPDATED",
}

type EventListeners<T> = {
  [StoreEvents.Updated]: [T];
}


// export const connect = <P extends Component<BaseProps, object> = Component<BaseProps, object>>(
//   component: ComponentConstructor<P>,
//   mapStateToProps: (state: typeof RootState.state) => Partial<typeof RootState.state>
// ): ComponentConstructor<P> => {
//   return class extends component {
//     constructor(props?: P) {
//       super(props);
//
//       RootState.subscribe((state) => {
//         this.props = { ...props, ...mapStateToProps(state) };
//       });
//     }
//
//     render() {
//       return super.render();
//     }
//   };
// }

export default class Store<T> {
  private readonly _state: T;
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
    const currentState = this._reducer(this._state, action);
    this._bus.emit(StoreEvents.Updated, currentState);
  }
}

