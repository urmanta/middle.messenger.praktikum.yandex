import Handlebars from 'handlebars';
import './chat-page.scss';
export { default as ChatPage } from './chat-page.hbs?raw';

Handlebars.registerHelper('chat-page-list', () => {
  return [
    { name: 'Rainbow Dash', message: 'Дружба – это магия', unread: '2', date: ''},
    { name: 'Applejack', message:'Отлично, сахарок!'},
    { name: 'Pinkie Pie', message:'О, я никогда не уезжаю из дома без своей пушки для праздника', unread: '4'},
  ]
});
