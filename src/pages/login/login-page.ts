import { FormLogin, FormWrapper } from "../../components";
import Block from "../../core/Block";

type LoginPageProps = {}

type LoginPageChildren = {
    FormLogin: FormWrapper,
}

export default class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
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
                    errorText: null
                })
            }),
        })
    }

    render() {
        return `
            <div class="login-page">
                {{{ FormLogin }}}
            </div>
        `
    }
}
