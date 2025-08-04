import { ChatPage, LoginPage, NotFoundErrorPage, ProfilePage, RegistrationPage, ServerErrorPage } from './pages';
import { Route, Router } from "./services/Router";
import AuthController from "./controllers/AuthController";

export const enum Routes {
  Login = '/',
  SignUp = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
  ServerError = '/server-error',
  NotFound = '/not-found',
}

export default class App {
  constructor() {
    this.init();
  }

  async init() {
    await AuthController.getUser();
    new Router('#app', [
      new Route(Routes.Login, LoginPage),
      new Route(Routes.SignUp, RegistrationPage),
      new Route(Routes.Settings, ProfilePage),
      new Route(Routes.Messenger, ChatPage),
      new Route(Routes.ServerError, ServerErrorPage),
      new Route(Routes.NotFound, NotFoundErrorPage),
    ]);
  }
}
