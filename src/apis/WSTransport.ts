import { Nullable } from "../utils/types";

interface WSHandlers {
  onOpen?: () => void;
  onMessage?: (e: MessageEvent) => void
}

export default class WSTransport {
  private socket: Nullable<WebSocket> = null;

  constructor(private url: string, private handlers: WSHandlers = {} ) {}

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', () => {
      this.handlers.onOpen?.();
    })

    this.socket.addEventListener('message', (e) => {
      this.handlers.onMessage?.(e);
    });
  }

  send<T>(payload: T) {
    if (this.socket?.readyState === WebSocket.OPEN) this.socket.send(JSON.stringify(payload));
  }

  close() {
    this.socket?.close();
    this.socket = null;
  }

  isOpen() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
