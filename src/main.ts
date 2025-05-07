import Handlebars from 'handlebars';
import App from './App';
import renderDOM from './utils/renderDOM';

Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
})

window.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new App());
});
