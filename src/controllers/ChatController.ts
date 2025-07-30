import ChatsAPI, { ModifyChatUsersRequestDTO } from "../apis/ChatsAPI";
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

  static async deleteChat(id: number) {
    try {
      await ChatsAPI.deleteChat(id);
      const response = await ChatsAPI.getChatList();
      RootStore.dispatch({ type: 'chats/setAll', payload: response });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async addUserToChat(payload: ModifyChatUsersRequestDTO) {
    try {
      await ChatsAPI.addUserToChat(payload);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async removeUserFromChat(payload: ModifyChatUsersRequestDTO) {
    try {
      await ChatsAPI.removeUserFromChat(payload);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
    }
  }

  static async getChatUsers(chatId: number) {
    try {
      return await ChatsAPI.getChatUsers(chatId);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Ошибка: ${err.message}`);
      }
      return [];
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
