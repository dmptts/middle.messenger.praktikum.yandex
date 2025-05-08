export default class EventBus<E extends Record<string, unknown[]>> {
  private readonly _listeners: {
    [K in keyof E]?: Array<(...args: E[K]) => void>;
  } = {};

  constructor() {
    this._listeners = {};
  }

  on<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  emit<K extends keyof E>(event: K, ...args: E[K]) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event.toString()}`);
    }

    this._listeners[event].forEach((listener) => listener(...args));
  }

  off<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event.toString()}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback
    );
  }
}
