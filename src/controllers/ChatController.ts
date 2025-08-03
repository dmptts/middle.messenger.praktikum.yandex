import ChatsAPI, { ModifyChatUsersRequestDTO } from "../apis/ChatsAPI";
import { RootStore } from "../main";
import UserAPI, { SearchUserRequestDTO } from "../apis/UserAPI";
import WSTransport from "../apis/WSTransport";

export interface SendMessageResponseDTO {
  chat_id: number;
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: 'message'
}

export default class ChatController {
  private static sockets = new Map<number, WSTransport>();

  static async getChats() {
    if (RootStore.state.chats.length) {
      return RootStore.state.chats;
    } else {
      try {
        const response = await ChatsAPI.getChatList();
        RootStore.dispatch({ type: 'chats/set', payload: response });
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
      RootStore.dispatch({ type: 'chats/set', payload: response });
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
      RootStore.dispatch({ type: 'chats/set', payload: response });
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

  static async connectToChat(chatId: number) {
    if (this.sockets.has(chatId)) return;

    const userId = RootStore.state.currentUser?.id;
    const { token } = await ChatsAPI.getChatToken(chatId);

    if (!userId || !token) return;

    const transport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`, {
      onOpen: () => transport.send({ type: 'get old', content: '0' }),
      onMessage: (e) => {
        const data = JSON.parse(e.data);

        if (Array.isArray(data) && data.every((elem) => elem.type === 'message') || data.type === 'message') {
          RootStore.dispatch({ type: 'messages/add', payload: { chatId: chatId, messages: Array.isArray(data) ? data : [data] } });
        }
      },
    });

    this.sockets.set(chatId, transport);
    transport.connect();
  }

  static sendMessage(chatId: number, content: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`WebSocket не подключён к чату ${chatId}`);
    }

    if (!content.trim()) return;

    if (socket.isOpen()) {
      socket.send({
        type: 'message',
        content,
      });
    } else {
      console.warn('Соединение ещё не установлено');
    }
  }
}
