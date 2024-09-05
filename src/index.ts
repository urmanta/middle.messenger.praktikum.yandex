import Handlebars from 'handlebars';
import * as Pages from './pages';
import Block from './core/Block';

interface PageComponent<P extends Record<string, unknown> = Record<string, unknown>> {
  new (props: P): Block<P>;
}

const pages: Record<string, [PageComponent, Record<string, unknown>]> = {
  'chat': [ Pages.ChatPage as PageComponent, {} ],
  'login': [ Pages.LoginPage as PageComponent, {} ],
  'registration': [ Pages.RegistrationPage as PageComponent, {} ],
  'profile': [ Pages.ProfilePage as PageComponent, {} ],
  'profile-edit': [ Pages.ProfileEditPage as PageComponent, {} ],
  'password-edit': [ Pages.PasswordEditPage as PageComponent, {} ],
  '404': [ Pages.NotFound as PageComponent, {} ],
  '500': [ Pages.ServerError as PageComponent, {} ],
};

function navigate(page: string) {

  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  if(source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    const pageContent = page.getContent();
    if (pageContent) {container.append(pageContent)};
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
