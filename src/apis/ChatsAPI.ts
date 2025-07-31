import HTTPTransport, { ClientErrorDto } from "./HTTPTransport";
import { UserDto } from "./AuthAPI";
import { Nullable } from "../utils/types";

export interface ChatListResponseDTO {
  id: number,
  tittle: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: UserDto,
    time: string,
    content: string
  }
}

export interface ChatTokenResponseDTO {
  token: string,
}

export interface ModifyChatUsersRequestDTO {
  users: Array<number>;
  chatId: number;
}

export interface ChatUserResponseDTO {
  id: number;
  first_name: string;
  second_name: string;
  display_name: Nullable<string>;
  login: string;
  avatar: Nullable<string>;
  role: 'admin' | 'regular',
}

export default class ChatsAPI {
  static async getChatList() {
    const response = await HTTPTransport.get('/chats', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 200) {
      return JSON.parse(response.responseText) as ChatListResponseDTO[];
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async createNewChat(title: string) {
    const response = await HTTPTransport.post('/chats', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload: { title },
    })

    if (response.status === 200) {
      return;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async deleteChat(chatId: number) {
    const response = await HTTPTransport.delete('/chats', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload: { chatId },
    })

    if (response.status === 200) {
      return;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async getChatToken(id: number) {
    const response = await HTTPTransport.post(`/chats/token/${id}`, {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return JSON.parse(response.responseText) as ChatTokenResponseDTO;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async addUserToChat(payload: ModifyChatUsersRequestDTO) {
    const response = await HTTPTransport.put('/chats/users', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload,
    });

    if (response.status === 200) {
      return;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async removeUserFromChat(payload: ModifyChatUsersRequestDTO) {
    const response = await HTTPTransport.delete('/chats/users', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload,
    });

    if (response.status === 200) {
      return;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async getChatUsers(chatId: number) {
    const response = await HTTPTransport.get(`/chats/${chatId}/users`, {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return JSON.parse(response.responseText) as ChatUserResponseDTO[];
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }
}
