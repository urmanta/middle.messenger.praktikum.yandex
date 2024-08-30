import Block from "../../core/Block";
import { ProfileField } from "../profile-field";

export default class Password extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);

        const OldPasswordInput = new ProfileField({title: 'Старый пароль', name: 'oldPassword', value: '88888', className: 'profile-page__input', type: 'password', onBlur: onChangeLoginBind});
        const NewPasswordInput = new ProfileField({title: 'Новый пароль', name: 'newPassword', value: '5555555', onBlur: onChangeLoginBind, className: 'profile-page__input', type: 'password'});
        const ConfirmNewPasswordInput = new ProfileField({title: 'Повторите новый пароль', name: 'confirmNewPassword', value: '5555555', onBlur: onChangeLoginBind, className: 'profile-page__input', type: 'password'});

        this.children = {
            ...this.children,
            OldPasswordInput,
            NewPasswordInput,
            ConfirmNewPasswordInput,
        }
    }

    onChangeLogin(e: any) {
        const inputValue = e.target.value;
        if(inputValue === 'error') {
            this.children.OldPasswordInput.setProps({error: true, errorText: 'some error'});
            return;
        } else {
            this.children.OldPasswordInput.setProps({error: false, errorText: null});

        }

        this.setProps({login: inputValue})
    }

    render() {
        return (
            `
                <div class="profile-page__data">
                    <div class="profile-page__name">{{{ name }}}</div>
                    <div class="profile-page__data">
                        {{{ OldPasswordInput }}}
                        {{{ NewPasswordInput }}}
                        {{{ ConfirmNewPasswordInput }}}
                    </div>
                    <div class="profile-page__actions">
                        {{{ controls }}}
                    </div>
                </div>
            `
        )
    }
}