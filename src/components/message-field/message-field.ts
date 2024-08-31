import Block from "../../core/Block";
import { Button } from "../button";
import {ProfileField} from "../profile-field";

class MessageField extends Block {
    init() {
        const onChangeBind = this.onChange.bind(this);
        const onSendBind = this.onSend.bind(this);

        const MessageInput = new ProfileField({name: 'message', className: 'message-field__input', onBlur: onChangeBind});
        const SendButton = new Button({type: 'submit', className: 'message-field__button', onClick: onSendBind, disabled: !this.props.isFormValid});

        this.children = {
            ...this.children,
            MessageInput,
            SendButton
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.SendButton.setProps({...newProps, disabled: !newProps.isFormValid});
        return true;
    }

    onSend() {
        if (this.props.isFormValid) {
            console.log('Данные формы валидны', this.props.message);
        } else {
            console.log('Данные формы невалидны', this.props.message);
        }
    }

    onChange(e: FocusEvent) {
        const inputElement = e.target as HTMLInputElement;
        const {value} = inputElement;

        this.setProps({
            isFormValid: Boolean(value),
            message: value
        });
    }

    render(): string {
        return `
            <div class="message-field">
                {{{ MessageInput }}}
                {{{ SendButton }}}
            </div>
        `
    }
}

export default MessageField;