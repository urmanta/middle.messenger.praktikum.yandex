import Block from "../../core/Block";
import { Button } from "../button";
import { ProfileField } from "../profile-field";

type MessageFieldProps = {
    isFormValid?: boolean,
    message: string,
    name?: string,
}

type MessageFieldChildren = {
    MessageInput: ProfileField,
    SendButton: Button
}

class MessageField extends Block<MessageFieldProps, MessageFieldChildren> {
    init() {
        const onChangeBind = this.onChange.bind(this);
        const onSendBind = this.onSend.bind(this);

        const MessageInput = new ProfileField({title: '', name: 'message', className: 'message-field__input', onBlur: onChangeBind});
        const SendButton = new Button({label: '', type: 'submit', className: 'message-field__button', onClick: onSendBind, disabled: !this.props.isFormValid});

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

    onChange(e: Event) {
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
