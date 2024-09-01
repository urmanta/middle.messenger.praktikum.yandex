import Block from "../../core/Block";

type ChatItemProps = {
    avatar?: string,
    name: string,
    date: string,
    message: string,
    unread: number | undefined,
}

class ChatItem extends Block<ChatItemProps, object> {
    constructor(props: ChatItemProps) {
        super(props)
    }

    render(): string {
        return `
            <div class="chat-item">
                <div class="chat-item__line"></div>
                <div class="chat-item__block{{#if current}} chat-item__block--current{{/if}}">
                    {{#if avatar}}
                    <div>
                      <img class="chat-item__avatar" src={{ avatar }} alt="Аватар"><img>
                    </div>
                    {{else }}
                    <div class="chat-item__avatar"></div>
                    {{/if}}
                    <div class="chat-item__name">{{ name }}</div>
                    <div class="chat-item__date">{{ date }}</div>
                    <div class="chat-item__message">
                        <span class="chat-item__message-text">{{ message }}</span>
                    </div>
                    {{#if unread}}
                        <div class="chat-item__unread">{{ unread }}</div>
                    {{/if}}
                </div>
            </div>
        `
    }
}

export default ChatItem;
