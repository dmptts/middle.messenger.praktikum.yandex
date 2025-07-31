import Component from "../../services/Component";
import { ChatUserResponseDTO } from "../../apis/ChatsAPI";
import { BaseProps } from "../../utils/types";
import template from './template.hbs?raw';
import UserDeleteListItem from "../UserDeleteListItem";
import ChatController from "../../controllers/ChatController";

interface UserListProps extends BaseProps {
  chatId: number;
  users: ChatUserResponseDTO[]
}

export default class UserDeleteList extends Component<UserListProps> {
  constructor(props: UserListProps) {
    super(props);
  }

  render(): DocumentFragment {
    const userList = this.props!.users.map((user) => new UserDeleteListItem({
      user,
      setListState: async (id) => {
        await ChatController.removeUserFromChat({ users: [user.id], chatId: this.props!.chatId })
        const targetIndex = this.props!.users.findIndex((user) => user.id === id);
        if (targetIndex === -1) return;
        this.props = { users: this.props!.users.filter((u) => u.id !== id) };
      }
    }));

    return this.compile(template, { userList });
  }
}
