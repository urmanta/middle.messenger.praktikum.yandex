import { FormRegistration, FormWrapper } from '../../components';
import Block from '../../core/Block';

type LoginPageProps = {
    className?: string
}

type LoginPageChildren = {
    FormRegistration: FormWrapper
}

export default class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      FormRegistration: new FormWrapper({
        title: 'Регистрация',
        FormBody: new FormRegistration({}),
      }),
    });
  }

  render() {
    return `
            <div class="login-page{{#if className}} {{ className }}{{/if}}">
                {{{ FormRegistration }}}
            </div>
        `;
  }
}
