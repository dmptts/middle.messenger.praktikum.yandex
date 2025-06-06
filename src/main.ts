import Handlebars from 'handlebars';
import App from './App';

Handlebars.registerHelper('ifEquals', function(this: Record<string, unknown>, arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
})

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
