import { ChatPage, LoginPage, NotFoundErrorPage, ProfilePage, RegistrationPage, ServerErrorPage } from './pages';
import Router, { Route } from "./services/Router";

export const enum Routes {
  Login = '/login',
  SignUp = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
  ServerError = '/server-error',
  NotFound = '',
}

export default class App {
  constructor() {
    new Router('#app', [
      new Route(Routes.Login, new LoginPage()),
      new Route(Routes.SignUp, new RegistrationPage()),
      new Route(Routes.Settings, new ProfilePage()),
      new Route(Routes.Messenger, new ChatPage()),
      new Route(Routes.ServerError, new ServerErrorPage()),
      new Route(Routes.NotFound, new NotFoundErrorPage()),
    ]);
  }
}
