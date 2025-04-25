export default class EventBus {
  private readonly _listeners: Record<string, ((...args: unknown[]) => void)[]>;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: (...args: unknown[]) => void) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event].forEach((listener) => listener(args));
  }

  off(event: string, callback: (...args: unknown[]) => void) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback
    );
  }
}
