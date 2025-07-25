import { RootStore } from "../main";
import UserAPI, { ChangePasswordRequestDTO, ChangeProfileRequestDTO } from "../apis/UserAPI";
import AuthAPI from "../apis/AuthAPI";

export default class ProfileController {
  static async changeProfile(payload: ChangeProfileRequestDTO) {
    try {
      const response = await UserAPI.changeProfile(payload);
      RootStore.dispatch({ type: 'user/set', payload: response });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async changePassword(payload: ChangePasswordRequestDTO) {
    try {
      await UserAPI.changePassword(payload);
      const response = await AuthAPI.getUser()
      RootStore.dispatch({ type: 'user/set', payload: response });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async changeAvatar(payload: FormData) {
    try {
      const response = await UserAPI.changeAvatar(payload);
      RootStore.dispatch({ type: 'user/set', payload: response });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }
}
