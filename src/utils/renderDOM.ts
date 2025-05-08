import Component from '../services/Component';
import { BaseProps } from './types';

export default (query: string, component: Component<BaseProps>) => {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Не найдет целевой элемент ${query}`);
  }

  if (!component.element) {
    throw new Error(`Компонент ${component.constructor.name} не вернул HTML Element`);
  }

  root.appendChild(component.element);
  component.dispatchComponentDidMount();

  return root;
};
