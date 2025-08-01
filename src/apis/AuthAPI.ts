import HTTPTransport, { ClientErrorDto, HttpStatus } from "./HTTPTransport";

export interface SignUpRequestDTO {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface SignInRequestDTO {
  login: string,
  password: string
}

export interface SignUpResponseDTO {
  id: number
}

export interface UserDto {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export default class AuthAPI {
  static async signUp(payload: SignUpRequestDTO) {
    const response = await HTTPTransport.post('/auth/signup', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload,
    })

    if (response.status === HttpStatus.Ok) {
      return JSON.parse(response.responseText) as SignUpResponseDTO;
    } else if (response.status === HttpStatus.BadRequest) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async signIn(payload: SignInRequestDTO) {
    const response = await HTTPTransport.post('/auth/signin', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      payload,
    })

    if (response.status === HttpStatus.Ok) {
      return;
    } else if (response.status === HttpStatus.BadRequest) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async signOut() {
    const response = await HTTPTransport.post('/auth/logout', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === HttpStatus.Ok) {
      return;
    } else if (response.status === HttpStatus.BadRequest) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }

  static async getUser() {
    const response = await HTTPTransport.get('/auth/user', {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === HttpStatus.Ok) {
      return JSON.parse(response.responseText) as UserDto;
    } else if (response.status === HttpStatus.BadRequest) {
      const error = JSON.parse(response.responseText) as ClientErrorDto;
      throw new Error(error.reason);
    } else {
      throw new Error(`Неожиданная ошибка: ${response.status}`);
    }
  }
}
