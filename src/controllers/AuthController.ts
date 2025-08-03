import AuthAPI, { SignInRequestDTO, SignUpRequestDTO } from "../apis/AuthAPI";
import { RootStore } from "../main";
import Router from "../services/Router";
import { Routes } from "../App";

export default class AuthController {
  static async signUp(payload: SignUpRequestDTO) {
    try {
      await AuthAPI.signUp(payload);

      Router.getInstance().go(Routes.Messenger);
      const user = await AuthAPI.getUser();
      RootStore.dispatch({ type: 'user/set', payload: user });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async signIn(payload: SignInRequestDTO) {
    try {
      await AuthAPI.signIn(payload);

      const user = await AuthAPI.getUser();
      RootStore.dispatch({ type: 'user/set', payload: user });
      Router.getInstance().go(Routes.Messenger);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async getUser() {
    if (!RootStore.state.currentUser) {
      try {
        const user = await AuthAPI.getUser();
        RootStore.dispatch({ type: 'user/set', payload: user });
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Ошибка: ${err.message}`);
        }
      }
    }
  }

  static async logOut() {
    try {
      await AuthAPI.signOut();
      RootStore.dispatch({ type: 'user/set', payload: null });
      Router.getInstance().go(Routes.Login);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }
}
