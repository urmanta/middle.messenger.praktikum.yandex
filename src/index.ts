import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';

const pages: {[index: string]:any} = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [ source, args ] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
  const el = e.target as HTMLInputElement;
  const page = el?.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
