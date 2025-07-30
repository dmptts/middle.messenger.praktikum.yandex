import ChatsAPI, { AddUserToChatRequestDTO } from "../apis/ChatsAPI";
import { RootStore } from "../main";
import UserAPI, { SearchUserRequestDTO } from "../apis/UserAPI";

export default class ChatController {
  static async getChats() {
    if (RootStore.state.chats.length) {
      return RootStore.state.chats;
    } else {
      try {
        const response = await ChatsAPI.getChatList();
        RootStore.dispatch({ type: 'chats/setAll', payload: response });
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Ошибка: ${err.message}`);
        }
      }
    }
  }

  static async createNewChat(title: string) {
    try {
      await ChatsAPI.createNewChat(title);
      const response = await ChatsAPI.getChatList();
      RootStore.dispatch({ type: 'chats/setAll', payload: response });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async addUserToChat(payload: AddUserToChatRequestDTO) {
    try {
      await ChatsAPI.addUserToChat(payload);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async searchUser(payload: SearchUserRequestDTO) {
    try {
      return await UserAPI.searchUser(payload);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
      return null;
    }
  }
}
