import { FormRegistration, FormWrapper } from "../../components";
import Block from "../../core/Block";

export default class LoginPage extends Block {

    constructor(props: any) {
        super({
            ...props,
            FormRegistration: new FormWrapper({
                title: 'Регистрация',
                formBody: new FormRegistration({}),
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
                {{{ FormRegistration }}}
            </div>
        `
    }
}