import Handlebars from 'handlebars';
import App from './App';
import Store, { Action } from "./services/Store";

Handlebars.registerHelper('ifEquals', function(this: Record<string, unknown>, arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
})

export enum ActionTypes {
  SignIn = 'SIGN_IN',
  SignUp = 'SIGN_UP',
}

interface RootState {
  count: number;
}

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SignIn:
      return state;
    default:
      return state;
  }
}

export const RootState = new Store<RootState>(reducer, {
  count: 0,
})


window.addEventListener('DOMContentLoaded', () => new App());
