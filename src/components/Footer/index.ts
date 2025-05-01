import { globalStorage, Pages } from '../../App';
import Component from '../../services/Component';
import { BaseProps } from '../../utils/types';
import Link from '../Link';
import Nav from '../Nav';
import template from './template.hbs?raw';

interface FooterProps extends BaseProps{
  nav: Nav,
}

export default class Footer extends Component<FooterProps> {
  constructor() {
    const nav = new Nav({
      links: [
        new Link({
          text: 'Логин',
          onClick: () => globalStorage.state = {
            currentPage: Pages.Login
          }
        }),
        new Link({
          text: 'Регистрация',
          onClick: () => globalStorage.state = {
            currentPage: Pages.Registration
          }
        }),
        new Link({
          text: 'Список чатов',
          onClick: () => globalStorage.state = {
            currentPage: Pages.ChatList
          }
        }),
        new Link({
          text: 'Чат',
          onClick: () => globalStorage.state = {
            currentPage: Pages.Chat
          }
        }),
        new Link({
          text: 'Профиль',
          onClick: () => globalStorage.state = {
            currentPage: Pages.Profile
          }
        }),
        new Link({
          text: 'Редактирование профиля',
          onClick: () => globalStorage.state = {
            currentPage: Pages.EditProfile
          }
        }),
        new Link({
          text: 'Изменение пароля',
          onClick: () => globalStorage.state = {
            currentPage: Pages.ChangePassword
          }
        }),
        new Link({
          text: '404',
          onClick: () => globalStorage.state = {
            currentPage: Pages.NotFoundError
          }
        }),
        new Link({
          text: '500',
          onClick: () => globalStorage.state = {
            currentPage: Pages.ServerError
          }
        })
      ],
    })
    super({ nav });
  }

  render() {
    return this.compile(template);
  }
}
