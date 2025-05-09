import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { BaseProps, Nullable } from '../utils/types';
import EventBus from './EventBus';

export const eventTypesMap = {
  onClick: 'click',
  onBlur: 'blur',
  onInput: 'input',
  onSubmit: 'submit',
  // etc...
} as const;

enum Events {
  INIT = 'FLOW_INIT',
  DID_MOUNT = 'FLOW_DID_MOUNT',
  RENDER = 'FLOW_RENDER',
  DID_UPDATE = 'FLOW_DID_UPDATE',
}

type EventListeners<P> = {
  [Events.INIT]: [];
  [Events.DID_MOUNT]: [];
  [Events.RENDER]: [];
  [Events.DID_UPDATE]: [oldProps: ComponentPrimitives<P>, props: ComponentPrimitives<P>];
}

type ComponentEvents<P> = Record<keyof P, EventListener>;
type ComponentChildren<P> = Record<keyof P, Component<BaseProps> | Component<BaseProps>[]>;
type ComponentPrimitives<P> = Record<keyof P, string | number | boolean | null | unknown>;

export default abstract class Component<P extends BaseProps = never> {
  protected _listeners: Nullable<ComponentEvents<P>>;
  protected _children: Nullable<ComponentChildren<P>>;
  protected _primitives: Nullable<ComponentPrimitives<P>>;
  protected _element: Nullable<HTMLElement>;
  private readonly _id: string;
  private _props: Nullable<P>;
  private _bus: EventBus<EventListeners<P>>;

  protected constructor(props?: P) {
    this._id = nanoid();
    this._bus = new EventBus();
    this._props = null;
    this._listeners = null;
    this._children = null;
    this._primitives = null;
    this._element = null;

    if (props) {
      this._props = props;
      const { listeners, children, primitives } = this._parseProps(this._props);
      this._listeners = listeners;
      this._children = children;
      this._primitives = this._proxyProps(primitives);
    }

    this._registerEvents();
    this._bus.emit(Events.INIT);
  }

  get props(): Nullable<P> {
    return this._props;
  }

  set props(props: Partial<P>) {
    this._props = { ...(this._props ?? {}), ...props } as P;
    const { listeners, children, primitives } = this._parseProps(this._props);

    this._listeners = listeners;
    this._children = children;

    if (this._primitives) {
      for (const key in primitives) {
        this._primitives[key] = primitives[key];
      }
    } else {
      this._primitives = this._proxyProps(primitives);
    }
  }

  get element() {
    return this._element;
  }

  dispatchComponentDidMount() {
    this._bus.emit(Events.DID_MOUNT);
  }

  protected abstract render(): DocumentFragment;

  protected componentDidMount?(): void;

  protected componentDidUpdate?(): void;

  protected compile(template: string) {
    const stubs = {} as Record<keyof P, string | string[]>;
    const fragment = document.createElement('template');

    if (this._children) {
      Object.entries(this._children).forEach(([key, child]) => {
        if (Array.isArray(child)) {
          stubs[key as keyof P] = child
            .map((component) => `<div data-id="${component._id}"></div>`)
            .join('');
        } else {
          stubs[key as keyof P] = `<div data-id="${child._id}"></div>`;
        }
      });
    }

    fragment.innerHTML = Handlebars.compile(template)(Object.assign({}, this._primitives, stubs));

    if (this._children) {
      Object.values(this._children).forEach((child) => {
        if (Array.isArray(child)) {
          const stubs = child
            .map((component) => fragment.content.querySelector(`[data-id="${component._id}"]`))
            .filter(Boolean) as HTMLElement[];

          if (!stubs.length) {
            return;
          }

          stubs.forEach((stub, i) => stub.replaceWith(child[i].element!));
        } else {
          const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
          if (!stub) {
            return;
          }

          stub.replaceWith(child.element!);
        }
      });
    }

    return fragment.content;
  }

  protected addEvents() {
    if (!this._element) {
      throw new Error(
        `Элемент еще не создан`,
      );
    }

    for (const listener in this._listeners) {
      const handler = this._listeners[listener as keyof P];

      if (!handler) {
        return;
      }

      this._element.addEventListener(
        eventTypesMap[listener as keyof typeof eventTypesMap],
        handler.bind(this),
      );
    }
  }

  protected removeEvents() {
    if (!this._listeners || !this._element) {
      return;
    }

    for (const listener in this._listeners) {
      this._element?.removeEventListener(
        eventTypesMap[listener as keyof typeof eventTypesMap],
        this._listeners[listener as keyof P],
      );
    }
  }

  private _registerEvents() {
    this._bus.on(Events.INIT, this._init.bind(this));
    this._bus.on(Events.RENDER, this._render.bind(this));
    this._bus.on(Events.DID_MOUNT, this._componentDidMount.bind(this));
    this._bus.on(Events.DID_UPDATE, this._componentDidUpdate.bind(this));
  }

  private _init() {
    this._bus.emit(Events.RENDER);
  }

  private _render() {
    this.removeEvents();

    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (!newElement) {
      throw new Error('Render должен возвращать непустой фрагмент');
    }

    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._element?.setAttribute('data-id', this._id);
    this.addEvents();
  }

  private _componentDidMount() {
    this.componentDidMount?.();

    Object.values(this._children ?? {}).forEach(children => {
      if (Array.isArray(children)) {
        children.forEach((child) => child.dispatchComponentDidMount());
      } else {
        children.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate() {
    this.componentDidUpdate?.();
    this._bus.emit(Events.RENDER);
  }

  private _parseProps(props: P) {
    const listeners = {} as ComponentEvents<P>;
    const children = {} as ComponentChildren<P>;
    const primitives = {} as ComponentPrimitives<P>;

    Object.entries(props).forEach(([key, value]) => {
      if (key in eventTypesMap && typeof value === 'function') {
        listeners[key as keyof P] = value.bind(this);
      } else if (
        value instanceof Component
        || (Array.isArray(value) && value.every((el) => el instanceof Component))) {
        children[key as keyof P] = value;
      } else {
        primitives[key as keyof P] = value;
      }
    });

    return {
      listeners,
      children,
      primitives,
    };
  }

  private _proxyProps(props: ComponentPrimitives<P>) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldProps = target;
        target[prop as keyof P] = value;
        this._bus.emit(Events.DID_UPDATE, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}
