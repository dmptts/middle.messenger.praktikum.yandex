import HTTPTransport, { ClientErrorDto } from "./HTTPTransport";

export interface ChangeProfileRequestDTO {
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface UserResponseDTO {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface ChangePasswordRequestDTO {
  oldPassword: string;
  newPassword: string;
}

export default class UserAPI {
  static async changeProfile(payload: ChangeProfileRequestDTO) {
    const response = await HTTPTransport.put('/user/profile', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload,
    })

    if (response.status === 200) {
      return JSON.parse(response.responseText) as UserResponseDTO;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async changePassword(payload: ChangePasswordRequestDTO) {
    const response = await HTTPTransport.put('/user/password', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload,
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

  static async changeAvatar(payload: FormData) {
    const response = await HTTPTransport.put('/user/profile/avatar', {
      headers: {
        mode: 'cors',
      },
      payload,
    })

    if (response.status === 200) {
      return JSON.parse(response.responseText) as UserResponseDTO;
    } else if (response.status === 400) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }
}
