import { ComponentConstructor } from "./Component";
import render from "../utils/render";
import { BaseProps } from "../utils/types";

export default class Router {
  static #instance: Router;
  readonly #rootQuery!: string;
  readonly #history!: History;
  readonly #routes!: Route[];

  constructor(rootQuery: string, routes: Route[]) {
    if (Router.#instance) {
      return Router.#instance;
    }

    this.#rootQuery = rootQuery;
    this.#history = window.history;
    this.#routes = routes;

    window.addEventListener('popstate', this.#handlePopstate.bind(this));

    this.#onRoute(window.location.pathname);

    Router.#instance = this;
  }

  static getInstance() {
    return this.#instance;
  }

  go(path: string) {
    this.#history.pushState({}, "", path);
    this.#onRoute(path);
  }

  #onRoute(path: string) {
    const targetRoute = this.#routes.find(route => path === route.path);

    if (!targetRoute) {
      this.#routes[this.#routes.length - 1].navigate(this.#rootQuery);
      return;
    }

    targetRoute.navigate(this.#rootQuery)
  }

  #handlePopstate(e: Event) {
    const target = e.target;

    if (target instanceof Window) {
      this.#onRoute(target.location.pathname)
    }
  }
}

export class Route<P extends BaseProps = never> {
  readonly #path: string;
  readonly #component: ComponentConstructor<P>;

  constructor(path: string, component: ComponentConstructor<P>) {
    this.#path = path;
    this.#component = component;
  }

  get path() {
    return this.#path;
  }

  navigate(rootQuery: string) {
    render(rootQuery, new this.#component());
  }
}
