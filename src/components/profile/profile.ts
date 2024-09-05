import Block from "../../core/Block";
import { Button } from "../button";
import { ProfileField } from "../profile-field";
import { validateEmail, validateLogin, validatePhone, validateName } from "../../utils";
import {Link} from "../link";
import {Input} from "../input";

type ProfileProps = {
    mail: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    isEditMode?: boolean,
    isFormValid?: boolean
}

type ProfileChildren = {
    MailInput: ProfileField,
    LoginInput: ProfileField,
    NameInput: ProfileField,
    SecondNameInput: ProfileField,
    DisplayNameInput: ProfileField,
    PhoneInput: ProfileField,
    SaveButton: Button,
    EditProfileLink: Link,
    EditPasswordLink: Link,
    LogOutLink: Link
}

export default class Profile extends Block<ProfileProps, ProfileChildren> {
    constructor(props: ProfileProps) {
        super(props);
    }

    init() {
        const onChangeBind = this.onChange.bind(this);
        const onSaveBind = this.onSave.bind(this);
        this.checkFormData();

        const MailInput = new ProfileField({title: 'Почта', name: 'mail', value: this.props.mail, onBlur: (e: Event) => onChangeBind(e, validateEmail), readonly: !this.props.isEditMode});
        const LoginInput = new ProfileField({title: 'Логин', name: 'login', value: this.props.login, onBlur: (e: Event) => onChangeBind(e, validateLogin), readonly: !this.props.isEditMode});
        const NameInput = new ProfileField({title: 'Имя', name: 'first_name', value: this.props.first_name, onBlur: (e: Event) => onChangeBind(e, validateName), readonly: !this.props.isEditMode});
        const SecondNameInput = new ProfileField({title: 'Фамилия', name: 'second_name', value: this.props.second_name, onBlur: (e: Event) => onChangeBind(e, validateName), readonly: !this.props.isEditMode});
        const DisplayNameInput = new ProfileField({title: 'Имя в чате', name: 'display_name', value: this.props.display_name, onBlur: (e: Event) => onChangeBind(e, validateName), readonly: !this.props.isEditMode});
        const PhoneInput = new ProfileField({title: 'Телефон', name: 'phone', value: this.props.phone, onBlur: (e: Event) => onChangeBind(e, validatePhone), readonly: !this.props.isEditMode});
        const SaveButton = new Button({label: 'Сохранить', page: 'profile', className: 'profile-page__save-button', onClick: onSaveBind, disabled: !this.props.isFormValid});
        const EditProfileLink = new Link({label: 'Изменить данные', page: 'profile-edit'});
        const EditPasswordLink = new Link({label: 'Изменить пароль', page: 'password-edit'});
        const LogOutLink = new Link({label: 'Выйти', page: 'login'});

        this.children = {
            ...this.children,
            MailInput,
            LoginInput,
            NameInput,
            SecondNameInput,
            DisplayNameInput,
            PhoneInput,
            SaveButton,
            EditProfileLink,
            EditPasswordLink,
            LogOutLink
        }
    }

    componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.SaveButton?.setProps({...newProps, disabled: !newProps.isFormValid});
        return true;
    }

    getFormData() {
        return {
            mail: this.props.mail,
            login: this.props.login,
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            display_name: this.props.display_name,
            phone: this.props.phone
        }
    }

    checkFormData() {
        this.setProps({isFormValid: Object.values(this.getFormData()).every(value => value !== undefined)});
    }

    onSave() {
        if (this.props.isFormValid) {
            console.log('Данные формы валидны', this.getFormData());
        } else {
            console.log('Данные формы невалидны', this.getFormData());
        }
    }

    onChange(e: Event, validateFunc: (str: string) => string | null) {
        const inputElement = e.target as HTMLInputElement;
        const {value, name} = inputElement;
        const validationError = validateFunc(value);
        const child = Object.values(this.children).find(
            (child): child is ProfileField => child instanceof Input && 'name' in child.props && child.props.name === name
        );
        if( validationError ) {
            child?.setProps({
                ...this.props,
                error: true,
                errorText: validationError
            });
            if (!value) this.setProps({
                ...this.props,
                [name]: undefined
            });
        } else {
            child?.setProps({error: false, errorText: undefined});
            this.setProps({[name]: value});
        }

        this.checkFormData();
    }

    render() {
        return (
            `
                <div class="profile-page__data">
                    <div class="profile-page__name">
                        {{#if isEditMode}}{{{ display_name }}}{{/if}}
                    </div>
                    <div class="profile-page__data">
                        {{{ MailInput }}}
                        {{{ LoginInput }}}
                        {{{ NameInput }}}
                        {{{ SecondNameInput }}}
                        {{{ DisplayNameInput }}}
                        {{{ PhoneInput }}}
                    </div>
                    <div class="profile-page__actions">
                        {{#if isEditMode}}
                            {{{ SaveButton }}}
                        {{else}}
                            {{{ EditProfileLink }}}
                            {{{ EditPasswordLink }}}
                            {{{ LogOutLink }}}
                        {{/if}}
                    </div>
                </div>
            `
        )
    }
}
