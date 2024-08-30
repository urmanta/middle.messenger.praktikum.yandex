import Block from "../../core/Block";
import { Button } from "../button";
import { Input } from "../input";
import { Link } from "../link";

export default class FormRegistration extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const InputEmail = new Input({label: 'Почта', name: 'email', onBlur: onChangeLoginBind, className: 'login-page__input'});
        const InputLogin = new Input({label: 'Логин', name: 'login', onBlur: onChangeLoginBind, className: 'login-page__input'});
        const InputName = new Input({label: 'Имя', name: 'first_name', onBlur: onChangeLoginBind, className: 'login-page__input'});
        const InputLastName = new Input({label: 'Фамилия', name: 'second_name', onBlur: onChangeLoginBind, className: 'login-page__input'});
        const InputPhone = new Input({label: 'Телефон', name: 'phone', onBlur: onChangeLoginBind, className: 'login-page__input'});
        const InputPassword = new Input({label: 'Пароль', name: 'password', className: 'login-page__input', type: 'password'});
        const InputPasswordConfirm = new Input({label: 'Пароль еще раз', name: 'password_confirm', className: 'login-page__input', type: 'password'});
        const ButtonRegistrate = new Button({label: 'Зарегистрироваться', type: 'primary', page: 'chat', onClick: onLoginBind});
        const ButtonLogin = new Link({label: 'Войти', page: 'login'});

        this.children = {
            ...this.children,
            InputEmail,
            InputLogin,
            InputName,
            InputLastName,
            InputPhone,
            InputPassword,
            InputPasswordConfirm,
            ButtonRegistrate,
            ButtonLogin,
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
            <form class="form-registration">
                <div class="form-registration__fields">
                    {{{ InputEmail }}}
                    {{{ InputLogin }}}
                    {{{ InputName }}}
                    {{{ InputLastName }}}
                    {{{ InputPhone }}}
                    {{{ InputPassword }}}
                    {{{ InputPasswordConfirm }}}
                </div>
                {{{ ButtonRegistrate }}}
                {{{ ButtonLogin }}}
            </form>
        `)
    }
}