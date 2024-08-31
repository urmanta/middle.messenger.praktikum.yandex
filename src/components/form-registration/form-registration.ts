import Block from "../../core/Block";
import { Button } from "../button";
import { Input } from "../input";
import { Link } from "../link";
import { validateEmail, validateLogin, validatePassword, validatePhone, validateName } from "../../utils";

export default class FormRegistration extends Block {
    init() {
        const onChangeBind = this.onChange.bind(this);
        const onSigninBind = this.onSignin.bind(this);

        const InputEmail = new Input({label: 'Почта', name: 'email', onBlur: (e: FocusEvent) => onChangeBind(e, validateEmail), className: 'login-page__input'});
        const InputLogin = new Input({label: 'Логин', name: 'login', onBlur: (e: FocusEvent) => onChangeBind(e, validateLogin), className: 'login-page__input'});
        const InputName = new Input({label: 'Имя', name: 'first_name', onBlur: (e: FocusEvent) => onChangeBind(e, validateName), className: 'login-page__input'});
        const InputLastName = new Input({label: 'Фамилия', name: 'second_name', onBlur: (e: FocusEvent) => onChangeBind(e, validateName), className: 'login-page__input'});
        const InputPhone = new Input({label: 'Телефон', name: 'phone', onBlur: (e: FocusEvent) => onChangeBind(e, validatePhone), className: 'login-page__input'});
        const InputPassword = new Input({label: 'Пароль', name: 'password', onBlur: (e: FocusEvent) => onChangeBind(e, validatePassword), className: 'login-page__input', type: 'password'});
        const InputPasswordConfirm = new Input({label: 'Пароль еще раз', name: 'password_confirm', onBlur: (e: FocusEvent) => onChangeBind(e, validatePassword), className: 'login-page__input', type: 'password'});
        const ButtonRegistrate = new Button({label: 'Зарегистрироваться', type: 'primary', page: 'chat', onClick: onSigninBind, disabled: !this.props.isFormValid});
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

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.ButtonRegistrate.setProps({...newProps, disabled: !newProps.isFormValid});
        return true;
    }

    getFormData() {
        return {
            email: this.props.email,
            login: this.props.login,
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            phone: this.props.phone,
            password: this.props.password,
            password_confirm: this.props.password_confirm
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

    onSignin() {
        if (this.checkFormData()) {
            console.log('Данные формы валидны', this.getFormData());
        } else {
            console.log('Данные формы невалидны', this.getFormData());
        }
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