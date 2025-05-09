export const chatsMock = [
  {
    id: 1,
    title: "Имя чата 1",
    avatar: "",
    unread_count: 15,
    created_by: 12345,
    last_message: {
      user: {
        first_name: "Петя",
        second_name: "Пупкин",
        avatar: "/path/to/avatar.jpg",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22"
      },
      time: "2020-01-02T14:22:22.000Z",
      content: "Тестовое сообщение из чата 1"
    }
  },
  {
    id: 2,
    title: "Имя чата 2",
    avatar: "",
    unread_count: 0,
    created_by: 123456,
    last_message: {
      user: {
        first_name: "Иван",
        second_name: "Иванов",
        avatar: "/path/to/avatar.jpg",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22"
      },
      time: "2020-01-02T14:22:22.000Z",
      content: "Тестовое сообщение из чата 2 Тестовое сообщение из чата 2 Тестовое сообщение из чата 2"
    }
  },
]
