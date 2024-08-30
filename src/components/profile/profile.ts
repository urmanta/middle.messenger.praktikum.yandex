import Block from "../../core/Block";
import { ProfileField } from "../profile-field";

export default class Profile extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);

        const MailInput = new ProfileField({title: 'Почта', name: 'mail', value: 'celestia@gmail.com', onBlur: onChangeLoginBind, className: 'profile-page__input', readonly: this.props.readonly});
        const LoginInput = new ProfileField({title: 'Логин', name: 'login', value: 'celestia', onBlur: onChangeLoginBind, className: 'profile-page__input', readonly: this.props.readonly});
        const NameInput = new ProfileField({title: 'Имя', name: 'first_name', value: 'Селестия', onBlur: onChangeLoginBind, className: 'profile-page__input', readonly: this.props.readonly});
        const SecondNameInput = new ProfileField({title: 'Фамилия', name: 'second_name', value: 'Принцесса', onBlur: onChangeLoginBind, className: 'profile-page__input', readonly: this.props.readonly});
        const DisplayNameInput = new ProfileField({title: 'Имя в чате', name: 'display_name', value: 'Селестия', onBlur: onChangeLoginBind, className: 'profile-page__input', readonly: this.props.readonly});
        const PhoneInput = new ProfileField({title: 'Телефон', name: 'phone', value: '+7 909 999 00 90', onBlur: onChangeLoginBind, className: 'profile-page__input', readonly: this.props.readonly});

        this.children = {
            ...this.children,
            MailInput,
            LoginInput,
            NameInput,
            SecondNameInput,
            DisplayNameInput,
            PhoneInput
        }
    }

    onChangeLogin(e: any) {
        const inputValue = e.target.value;
        if(inputValue === 'error') {
            this.children.LoginInput.setProps({error: true, errorText: 'some error'});
            return;
        } else {
            this.children.LoginInput.setProps({error: false, errorText: null});

        }

        this.setProps({login: inputValue})
    }

    render() {
        return (
            `
                <div class="profile-page__data">
                    <div class="profile-page__name">{{{ name }}}</div>
                    <div class="profile-page__data">
                        {{{ MailInput }}}
                        {{{ LoginInput }}}
                        {{{ NameInput }}}
                        {{{ SecondNameInput }}}
                        {{{ DisplayNameInput }}}
                        {{{ PhoneInput }}}
                    </div>
                    <div class="profile-page__actions">
                        {{{ controls }}}
                    </div>
                </div>
            `
        )
    }
}