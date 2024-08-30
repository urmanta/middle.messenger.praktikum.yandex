import { FormLogin, FormWrapper } from "../../components";
import Block from "../../core/Block";

export default class LoginPage extends Block {

    constructor(props: any) {
        super({
            ...props,
            FormLogin: new FormWrapper({
                title: 'Вход',
                formBody: new FormLogin({}),
                onSubmit: (e: any) => {
                    e.preventDefault();
                    console.log('submit')
                }
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