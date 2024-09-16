import Block, { Props } from "../../core/Block";
import { Button } from "../button";
import { Input } from "../input";
import { Link } from "../link";
import { validateLogin, validatePassword, withRouter } from "../../utils";

interface FormLoginProps extends Props {
    isFormValid: boolean,
    login: string | undefined,
    password: string | undefined,
    error: boolean,
    errorText: string | null
}

type FormLoginChildren = {
    InputLogin: Input,
    FormPassword: Input,
    ButtonLogin: Button,
    ButtonCreateAccount: typeof Link
}

export class FormLoginComponent extends Block<FormLoginProps, FormLoginChildren> {
    constructor(props: FormLoginProps) {
        super(props);
    }

    init() {
        const onChangeBind = this.onChange.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const InputLogin = new Input({label: 'Логин', name: 'login', value: undefined, onBlur: (e: Event) => onChangeBind(e, validateLogin), className: 'login-page__input'});
        const FormPassword = new Input({label: 'Пароль', name: 'password', value: undefined, type: 'password', onBlur: (e: Event) => onChangeBind(e, validatePassword), className: 'login-page__input'});
        const ButtonLogin = new Button({label: 'Авторизироваться', type: 'primary', page: 'chat', onClick: onLoginBind, disabled: !this.props.isFormValid});
        const ButtonCreateAccount = new Link({label: 'Нет аккаунта?', page: '/sign-up'});

        this.children = {
            ...this.children,
            InputLogin,
            FormPassword,
            ButtonLogin,
            ButtonCreateAccount
        }
    }

    componentDidUpdate(oldProps: FormLoginProps, newProps: FormLoginProps): boolean {
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

    onChange(e: Event, validateFunc: (str: string) => string | null) {
        const inputElement = e.target as HTMLInputElement;
        const {value, name} = inputElement;
        const validationError = validateFunc(value);
        const child = Object.values(this.children).find(
            (child): child is Input => child instanceof Input && 'name' in child.props && child.props.name === name
        );
        if( validationError ) {
            child?.setProps({error: true, errorText: validationError});
            if (!value) this.setProps({[name]: undefined});
        } else {
            child?.setProps({error: false, errorText: undefined});
            this.setProps({[name]: value});
        }

        this.setProps({[name]: value});

        this.setProps({isFormValid: this.checkFormData()});
    }

    onLogin() {
        if (this.checkFormData()) {
            console.log('Данные формы валидны', this.getFormData());
            this.props.router!.go('/messenger');
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

export default withRouter(FormLoginComponent);
