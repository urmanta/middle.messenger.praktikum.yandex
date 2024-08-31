import Block from "../../core/Block";
import { Button } from "../button";
import { Input } from "../input";
import { Link } from "../link";
import { validateLogin, validatePassword } from "../../utils";

export default class FormLogin extends Block {
    init() {
        const onChangeBind = this.onChange.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const InputLogin = new Input({label: 'Логин', name: 'login', value: null, onBlur: (e: FocusEvent) => onChangeBind(e, validateLogin), className: 'login-page__input'});
        const FormPassword = new Input({label: 'Пароль', name: 'password', value: null, type: 'password', onBlur: (e: FocusEvent) => onChangeBind(e, validatePassword), className: 'login-page__input'});
        const ButtonLogin = new Button({label: 'Авторизироваться', type: 'primary', page: 'chat', onClick: onLoginBind, disabled: !this.props.isFormValid});
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
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.ButtonLogin.setProps({...newProps, disabled: !newProps.isFormValid});
        return true;
    }

    getFormData() {
        return {
            login: this.props.login,
            password: this.props.password
        }
    }

    checkFormData() {
        return Object.values(this.getFormData()).every(value => value !== undefined);
    }

    onChange(e: FocusEvent, validateFunc: (str: string) => string | null) {
        const inputElement = e.target as HTMLInputElement;
        const {value, name} = inputElement;
        const validationError = validateFunc(value);
        const child = Object.values(this.children).find((child: Block) => child.props.name === name);

        if( validationError ) {
            child?.setProps({error: true, errorText: validationError});
            if (!value) this.setProps({[name]: undefined});
        } else {
            child?.setProps({error: false, errorText: null});
            this.setProps({[name]: value});
        }

        this.setProps({[name]: value});

        this.setProps({isFormValid: this.checkFormData()});
    }

    onLogin() {
        if (this.checkFormData()) {
            console.log('Данные формы валидны', this.getFormData());
        } else {
            console.log('Данные формы невалидны', this.getFormData());
        }
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