import Block, { Props } from '../../core/Block';
import { Message, UserDTO } from '../../api/type';
import connect from '../../core/Connect.ts';

type ChatMessageProps = Props & Message & {
    user: UserDTO
};

class ChatMessage extends Block<ChatMessageProps, object> {
  constructor(props: ChatMessageProps) {
    const getDate = (time: string): string => {
      const date = new Date(time);
      return `${date.getHours()}:${date.getMinutes()}`;
    };

    super({
      ...props,
      time: props.time ? getDate(props.time) : '',
      isMine: props.user!.id === props.user_id,
    });
  }

  render(): string {
    return `
            <div class="chat-message{{#if isMine}} chat-message--mine{{/if}}">
                {{ content }}
                <div class="chat-message__time">{{ time }}</div>
            </div>
        `;
  }
}

// @ts-expect-error: пу пу пу
export default connect(({ user }) => ({ user }))(ChatMessage);
