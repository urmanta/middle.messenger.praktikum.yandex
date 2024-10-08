import Block from '../../core/Block';
import { Button } from '../button';
import { ProfileField } from '../profile-field';

type MessageFieldProps = {
    message: string,
    name?: string,
}

type MessageFieldChildren = {
    MessageInput: ProfileField,
    SendButton: Button
}

class MessageField extends Block<MessageFieldProps, MessageFieldChildren> {
  message: string = '';

  init() {
    const onChangeBind = this.onChange.bind(this);
    const onSendBind = this.onSend.bind(this);

    const MessageInput = new ProfileField({
      title: '', name: 'message', className: 'message-field__input', value: this.props.message, onInput: onChangeBind,
    });
    const SendButton = new Button({
      label: '', type: 'submit', className: 'message-field__button', onClick: onSendBind,
    });

    this.children = {
      ...this.children,
      MessageInput,
      SendButton,
    };
  }

  componentDidUpdate(oldProps: MessageFieldProps, newProps: MessageFieldProps): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.MessageInput.setProps({ ...newProps, value: this.props.message });
    return true;
  }

  onSend() {
    if (window.webSocket && this.message) {
      window.webSocket.sendMessage(JSON.stringify({
        content: this.message,
        type: 'message',
      }));
      this.message = '';
      this.setProps({
        message: '',
      });
    }
  }

  onChange(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const { value } = inputElement;

    this.message = value;
  }

  render(): string {
    return `
            <div class="message-field">
                {{{ MessageInput }}}
                {{{ SendButton }}}
            </div>
        `;
  }
}

export default MessageField;
