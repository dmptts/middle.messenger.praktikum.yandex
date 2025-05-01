import App from './App';
import renderDOM from './utils/renderDOM';

window.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new App());
});
