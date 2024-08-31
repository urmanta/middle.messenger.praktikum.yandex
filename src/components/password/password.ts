import Block from "../../core/Block";
import { ProfileField } from "../profile-field";
import { Button } from "../button";
import { validatePassword } from "../../utils";

export default class Password extends Block {
    init() {
        const onChangeBind = this.onChange.bind(this);
        const onSaveBind = this.onSave.bind(this);

        const OldPasswordInput = new ProfileField({title: 'Старый пароль', name: 'oldPassword', type: 'password', onBlur: onChangeBind});
        const NewPasswordInput = new ProfileField({title: 'Новый пароль', name: 'newPassword', onBlur: onChangeBind, type: 'password'});
        const ConfirmNewPasswordInput = new ProfileField({title: 'Повторите новый пароль', name: 'confirmNewPassword', onBlur: onChangeBind, type: 'password'});
        const SaveButton = new Button({label: 'Сохранить', page: 'profile', className: 'profile-page__save-button', onClick: onSaveBind, disabled: !this.props.isFormValid});

        this.children = {
            ...this.children,
            OldPasswordInput,
            NewPasswordInput,
            ConfirmNewPasswordInput,
            SaveButton
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.SaveButton?.setProps({...newProps, disabled: !newProps.isFormValid});
        return true;
    }

    getFormData() {
        return {
            oldPassword: this.props.oldPassword,
            newPassword: this.props.newPassword,
            confirmNewPassword: this.props.confirmNewPassword
        }
    }

    checkFormData() {
        this.setProps({
            isFormValid: Object.values(this.getFormData()).every(value => value !== undefined)
        });
    }

    onSave() {
        if (this.props.isFormValid) {
            console.log('Данные формы валидны', this.getFormData());
        } else {
            console.log('Данные формы невалидны', this.getFormData());
        }
    }

    onChange(e: FocusEvent) {
        const inputElement = e.target as HTMLInputElement;
        const {value, name} = inputElement;
        const validationError = validatePassword(value);
        const child = Object.values(this.children).find((child: Block) => child.props.name === name);
        if( validationError ) {
            child?.setProps({error: true, errorText: validationError});
            if (!value) this.setProps({[name]: undefined});
        } else {
            child?.setProps({error: false, errorText: null});
            this.setProps({[name]: value});
        }

        this.setProps({[name]: value});

        this.checkFormData();
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
                        {{{ SaveButton }}}
                    </div>
                </div>
            `
        )
    }
}