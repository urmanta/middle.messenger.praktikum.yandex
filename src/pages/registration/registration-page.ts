import { FormRegistration, FormWrapper } from "../../components";
import Block from "../../core/Block";

type LoginPageProps = {}

type LoginPageChildren = {
    FormRegistration: FormWrapper
}

export default class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
    constructor(props: any) {
        super({
            ...props,
            FormRegistration: new FormWrapper({
                title: 'Регистрация',
                FormBody: new FormRegistration({})
            }),
        })
    }

    render() {
        return `
            <div class="login-page">
                {{{ FormRegistration }}}
            </div>
        `
    }
}
