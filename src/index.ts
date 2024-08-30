import Handlebars from 'handlebars';
import * as Pages from './pages';

const pages: {[index: string]:any[]} = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'registration': [ Pages.RegistrationPage ],
  'profile': [ Pages.ProfilePage ],
  'profile-edit': [ Pages.ProfileEditPage ],
  'password-edit': [ Pages.PasswordEditPage ],
  '404': [ Pages.NotFound ],
  '500': [ Pages.ServerError ],
};

function navigate(page: string) {

  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  if(source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
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
