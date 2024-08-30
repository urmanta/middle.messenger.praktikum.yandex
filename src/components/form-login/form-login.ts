import Block from "../../core/Block";
import { Button } from "../button";
import { Input } from "../input";
import { Link } from "../link";

export default class FormLogin extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const InputLogin = new Input({label: 'Логин', name: 'login', value: null, onBlur: onChangeLoginBind, className: 'login-page__input'});
        const FormPassword = new Input({label: 'Пароль', name: 'password', value: null, type: 'password',  className: 'login-page__input'});
        const ButtonLogin = new Button({label: 'Авторизироваться', type: 'primary', page: 'chat', onClick: onLoginBind});
        const ButtonCreateAccount = new Link({label: 'Нет аккаунта?', page: 'registration'});
        const NotFound = new Link({label: '404', page: '404'});
        const ServerError = new Link({label: '500', page: '500'});

        this.children = {
            ...this.children,
            InputLogin,
            FormPassword,
            ButtonLogin,
            ButtonCreateAccount,
            NotFound,
            ServerError
        }

        this.name = 'LoginPage'
    }

    onChangeLogin(e: any) {
        const inputValue = e.target.value;
        if(inputValue === 'error') {
            this.children.InputLogin.setProps({error: true, errorText: 'some error'});
            return;
        } else {
            this.children.InputLogin.setProps({error: false, errorText: null});

        }

        this.setProps({login: inputValue})
    }

    onLogin() {
        console.log({
            login: this.props.login
        })
    }



    render() {
        return (`
            <form class="form-login">
                <div class="form-login__fields">
                    {{{ InputLogin }}}
                    {{{ FormPassword }}}
                </div>
                {{{ ButtonLogin }}}
                {{{ ButtonCreateAccount }}}
                {{{ NotFound }}}
                {{{ ServerError }}}
            </form>
        `)
    }
}