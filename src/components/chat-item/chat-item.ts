import Block from "../../core/Block";
import { ChatDTO, UserDTO, Message } from "../../api/type";
import connect from "../../core/Connect";
import { requestChatToken } from "../../services/chats";

type ChatItemProps = ChatDTO & {
    user: UserDTO,
    currentChat: number,
    isCurrent: boolean,
    messages: Message[]
};

class ChatItem extends Block<ChatItemProps, object> {
    constructor(props: ChatItemProps) {
        const getDate = (time: string): string => {
            const date = new Date(time);
            return `${date.getHours()}:${date.getMinutes()}`
        }

        super({
            ...props,
            isCurrent: props.currentChat === props.id,
            events: {
                click: () => {
                    if (window.webSocket) window.webSocket.disconnect();
                    requestChatToken({id: props.id, userId: props.user.id});
                }
            },
            date: props.last_message ? getDate(props.last_message.time) : ''
        });
    }

    componentDidUpdate(oldProps: ChatItemProps, newProps: ChatItemProps): boolean {
        if (oldProps.currentChat === newProps.currentChat) {
            return false;
        }
        this.setProps({
            isCurrent: newProps.currentChat === newProps.id
        })
        return true;
    }

    render(): string {
        return `
            <div class="chat-item">
                <div class="chat-item__line"></div>
                <div class="chat-item__block{{#if isCurrent}} chat-item__block--current{{/if}}">
                    {{#if avatar}}
                    <div>
                      <img class="chat-item__avatar" src={{ avatar }} alt="Аватар"><img>
                    </div>
                    {{else }}
                    <div class="chat-item__avatar"></div>
                    {{/if}}
                    <div class="chat-item__name">{{ title }}</div>
                    {{#if last_message}}
                    <div class="chat-item__date">{{ date }}</div>
                    <div class="chat-item__message">
                        <span class="chat-item__message-text">{{ last_message.content }}</span>
                    </div>
                    {{/if}}
                    {{#if unread_count}}
                        <div class="chat-item__unread">{{ unread_count }}</div>
                    {{/if}}
                </div>
            </div>
        `
    }
}

// @ts-expect-error: пу пу пу
export default connect(({ currentChat, user }) => ({ currentChat, user }))(ChatItem);
