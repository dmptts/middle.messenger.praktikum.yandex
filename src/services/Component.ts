import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { BaseProps, Nullable } from '../utils/types';
import EventBus from './EventBus';
import { isEqual } from "../utils/isEqual";

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

type EventListeners = {
  [Events.INIT]: [];
  [Events.DID_MOUNT]: [];
  [Events.RENDER]: [];
  [Events.DID_UPDATE]: [oldData: Record<string, unknown> | object, data: Record<string, unknown> | object];
}

type ComponentEvents<P> = Record<keyof P, EventListener>;
type ComponentChildren<P> = Record<keyof P, Component<BaseProps> | Component<BaseProps>[]>;
type ComponentPrimitives<P> = Record<keyof P, string | number | boolean | null | unknown>;

export default abstract class Component<P extends BaseProps = never, S extends object = never> {
  protected _listeners: Nullable<ComponentEvents<P>>;
  protected _children: Nullable<ComponentChildren<P>>;
  protected _primitives: Nullable<ComponentPrimitives<P>>;
  protected _element: Nullable<HTMLElement>;
  private readonly _id: string;
  private _props: Nullable<P>;
  private _bus: EventBus<EventListeners>;

  protected constructor(props?: P) {
    this._id = nanoid();
    this._bus = new EventBus();
    this._props = null;
    this._state = null;
    this._listeners = null;
    this._children = null;
    this._primitives = null;
    this._element = null;

    if (props) {
      this._props = props;
      const { listeners, children, primitives } = this._parseProps(this._props);
      this._listeners = listeners;
      this._children = children;
      this._primitives = this._proxyData(primitives);
    }

    this._registerEvents();
    this._bus.emit(Events.INIT);
  }

  private _state: Nullable<S>;

  get props(): Nullable<P> {
    return this._props;
  }

  get state(): Nullable<S> {
    return this._state;
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
      this._primitives = this._proxyData(primitives);
    }
  }

  setState(update: Partial<S> | ((prevState: Nullable<S>) => Partial<S>)) {
    const nextState = typeof update === 'function' ? update(this._state) : update;

    if (this._state) {
      for (const key in nextState) {
        const value = nextState[key];
        if (value !== undefined) {
          this._state[key] = value;
        }
      }
    } else {
      this._state = this._proxyData(nextState as S);
      this._bus.emit(Events.DID_UPDATE, {}, nextState);
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

  protected compile(template: string, children?: ComponentChildren<P>) {
    // console.log(this.constructor.name)
    const stubs = {} as Record<keyof P, string | string[]>;
    const allChildren = { ...this._children, ...children };
    const fragment = document.createElement('template');

    if (allChildren) {
      Object.entries(allChildren).forEach(([key, child]) => {
        if (Array.isArray(child)) {
          stubs[key as keyof P] = child
            .map((component) => `<div data-id="${component._id}"></div>`)
            .join('');
        } else {
          stubs[key as keyof P] = `<div data-id="${child._id}"></div>`;
        }
      });
    }

    fragment.innerHTML = Handlebars.compile(template)(Object.assign({}, { ...this._primitives, ...this._state }, stubs));

    if (allChildren) {
      Object.values(allChildren).forEach((child) => {
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
    this._bus.on(Events.DID_UPDATE, (oldProps: Record<string, unknown> | object, newProps: Record<string, unknown> | object) => this._componentDidUpdate(oldProps, newProps));
  }

  private _init() {
    this._bus.emit(Events.RENDER);
  }

  private _render() {
    console.log('render: ', this.constructor.name);
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
    console.log('componentDidMount: ', this.constructor.name);

    Object.values(this._children ?? {}).forEach(children => {
      if (Array.isArray(children)) {
        children.forEach((child) => child.dispatchComponentDidMount());
      } else {
        children.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: Record<string, unknown> | object, newProps: Record<string, unknown> | object) {
    if (!isEqual(oldProps, newProps)) {
      this.componentDidUpdate?.();
      this._bus.emit(Events.RENDER);
    }
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

  private _proxyData<T extends S | ComponentPrimitives<P>>(data: T): T {
    return new Proxy(data, {
      get(target, key) {
        const value = target[key as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, key, value) => {
        const oldData = { ...target };
        target[key as keyof T] = value;
        this._bus.emit(Events.DID_UPDATE, oldData, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}
