import EventBus from './EventBus';

enum Events {
  CHANGE = 'STORE_CHANGE',
}

type EventListeners<T> = {
  [Events.CHANGE]: [T];
}

export default class Store<T> {
  private _state: T;
  private _bus: EventBus<EventListeners<T>>;

  constructor(initialState: T) {
    this._bus = new EventBus<EventListeners<T>>();
    this._state = initialState;
  }

  get state(): T {
    return this._state;
  }

  set state(state: Partial<T>) {
    this._state = { ...this._state, ...state };
    this._bus.emit(Events.CHANGE, this._state);
  }

  subscribe(callback: (state: T) => void) {
    this._bus.on(Events.CHANGE, callback);
  }

  unsubscribe(callback: (state: T) => void) {
    this._bus.off(Events.CHANGE, callback);
  }
}
