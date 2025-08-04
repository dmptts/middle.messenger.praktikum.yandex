import { Route, Router } from "./Router";
import { Routes } from "../../App";
import Component from "../Component";
import { RootStore } from "../../main";

describe('Router', () => {
  let router: Router;
  let route1: Route;
  let route2: Route;

  beforeEach(() => {
    RootStore.state.currentUser = null;
    document.body.innerHTML = '<div id="app"></div>';

    class MockComponent extends Component {
      render() {
        const fragment = new DocumentFragment();
        fragment.append(document.createElement('div'))
        return fragment;
      }
    }

    route1 = new Route(Routes.Login, MockComponent);
    route2 = new Route(Routes.Messenger, MockComponent);
    router = new Router('#app', [route1, route2]);

    window.history.replaceState({}, '', '/');
  })

  test('Роутер является синглтоном', () => {
    const routerDuplicate = new Router('', []);
    expect(routerDuplicate).toBe(router);
  });

  test('Router.go() изменяет состояние history', () => {
    const pushSpy = jest.spyOn(window.history, 'pushState');

    router.go('/messenger');

    expect(pushSpy).toHaveBeenCalledWith({}, '', '/messenger');
  })

  test('Роутер редиректит с защищенных маршрутов на страницу логина', () => {
    const replaceSpy = jest.spyOn(window.history, 'replaceState');

    router.go('/messenger');

    expect(replaceSpy).toHaveBeenCalledWith({}, '', '/');
  })

  test('Роутер редиректит на мессенджер если пользователь авторизован', () => {
    RootStore.state.currentUser = {
      id: 1,
      first_name: "",
      second_name: '',
      login: '',
      email: '',
      phone: '',
      avatar: ''
    }
    const replaceSpy = jest.spyOn(window.history, 'replaceState');

    router.go('/');

    expect(replaceSpy).toHaveBeenCalledWith({}, '', '/messenger');
  })
})
