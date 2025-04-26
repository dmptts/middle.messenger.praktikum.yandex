import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

enum Events {
  INIT = 'FLOW_INIT',
  RENDER = 'FLOW_RENDER',
  UPDATE = 'FLOW_DID_UPDATE',
}

type EventListeners = {
  [Events.INIT]: [];
  [Events.RENDER]: [];
  [Events.UPDATE]: [oldProps: PlainProps, props: PlainProps];
}

type EventListenerProps = {
  -readonly [K in keyof typeof eventTypesMap]?: (e: Event) => void;
};

type ChildProps = {
  [key: string]: Component;
};

type PlainProps = {
  [key: string]: unknown;
};

type ComponentProps = EventListenerProps & PlainProps & Partial<ChildProps>;

const eventTypesMap = {
  onClick: 'click',
} as const;

export default abstract class Component {
  private _id: string;
  private _bus: EventBus<EventListeners>;
  private _listeners: EventListenerProps;
  private _children: ChildProps;
  private _props: PlainProps;
  private _element?: HTMLElement;

  protected constructor(props?: ComponentProps) {
    this._id = nanoid();
    this._bus = new EventBus();

    const { listeners, children, plainProps } = this._parseProps(props ?? {});
    this._listeners = listeners;
    this._children = children;
    this._props = this._proxyProps(plainProps ?? {});

    this._registerEvents();
    this._bus.emit(Events.INIT);
  }

  set props(props: ComponentProps) {
    if (this._props) {
      Object.assign(this._props, props);
    } else {
      this._props = this._proxyProps(props);
    }
  }

  get element() {
    return this._element;
  }

  abstract render(): DocumentFragment;

  protected compile(template: string) {
    const propsAndStubs = { ...this._props };
    const fragment = document.createElement('template');

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    console.log(propsAndStubs);

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      console.log(child)
      if (!stub) {
        return;
      }

      stub.replaceWith(child.element!);
    });

    return fragment.content;
  }

  private _registerEvents() {
    this._bus.on(Events.INIT, this._init.bind(this));
    this._bus.on(Events.RENDER, this._render.bind(this));
    // this._bus.on(Events.UPDATE, this._componentDidUpdate.bind(this));
  }

  private _init() {
    // this._template = document.createElement('template');
    this._bus.emit(Events.RENDER);
  }

  private _render() {
    console.log('RENDER ', this.constructor.name);
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(this.render());
    this._element = tempDiv.firstChild as HTMLElement;
    this._element?.setAttribute('data-id', this._id);
    this._addEvents();
  }

  private _addEvents() {
    if (!this._element) {
      throw new Error(
        `Элемент еще не создан`,
      );
    }

    for (const listener in this._listeners) {
      const handler = this._listeners[listener as keyof EventListenerProps];

      if (handler) {
        this._element.addEventListener(
          eventTypesMap[listener as keyof typeof eventTypesMap],
          handler.bind(this),
        );
      }
    }
  }

  private _parseProps(props: ComponentProps) {
    const listeners = {} as EventListenerProps;
    const children = {} as ChildProps;
    const plainProps = {} as PlainProps;

    Object.entries(props).forEach(([key, value]) => {
      if (key in eventTypesMap && typeof value === 'function') {
        listeners[key as keyof typeof eventTypesMap] = value.bind(this);
      } else if (value instanceof Component) {
        children[key] = value;
      } else {
        plainProps[key] = value;
      }
    });

    return { listeners, children, plainProps };
  }

  // private _componentDidUpdate(oldProps: PlainProps, props: PlainProps) {
  //   console.log('FLOW_DID_UPDATE');
  //   this._bus.emit(Events.RENDER);
  // }

  private _proxyProps(props: PlainProps) {
    return new Proxy(props, {
      set: (target, prop, value) => {
        const oldProps = { ...target };
        target[prop as keyof PlainProps] = value;
        this._bus.emit(Events.UPDATE, oldProps, target);
        return true;
      },
    });
  }
}
