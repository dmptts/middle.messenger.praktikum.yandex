export type BaseProps = Record<string, unknown>;
export type Nullable<T> = T | null;
export type StateSetter<T> = (update: Partial<T> | ((prev: Nullable<T>) => Partial<T>)) => void
export type Indexed = Record<string, unknown>;

export interface UserDto {
  first_name: string,
  second_name: string,
  avatar: string,
  email: string,
  login: string,
  phone: string,
}

export interface MessageDto {
  user: UserDto;
  time: string;
  content: string
}

export interface ChatDto {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: MessageDto
}
