import { FormLogin, FormWrapper } from '../../components';
import Block from '../../core/Block';
import connect from '../../core/Connect';

type LoginPageProps = {
    className?: string
}

type LoginPageChildren = {
    FormLogin: FormWrapper,
}

class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      FormLogin: new FormWrapper({
        title: 'Вход',
        FormBody: new FormLogin({
          isFormValid: false,
          login: undefined,
          password: undefined,
          error: false,
          errorText: null,
        }),
      }),
    });
  }

  render() {
    return `
            <div class="login-page{{#if className}} {{ className }}{{/if}}">
                {{{ FormLogin }}}
            </div>
        `;
  }
}

export default connect(({ loginField }) => ({ loginField }))(LoginPage);
