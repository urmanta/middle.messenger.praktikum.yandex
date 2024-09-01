import Block from "../../core/Block";
import { ChatItem } from "../chat-item";

type ChatListProps = {
    className?: string
}

type ChatListChildren = {
    ChatItems: ChatItem[],
}

const chatStub = [
    { name: 'Rainbow Dash', message: 'Дружба – это магия', unread: 2, date: '28.08.2024', avatar: ''},
    { name: 'Applejack', message:'Отлично, сахарок!', date: '27.08.2024', avatar: ''},
    { name: 'Pinkie Pie', message:'О, я никогда не уезжаю из дома без своей пушки для праздника', unread: 4, date: '24.08.2024', avatar: ''},
]

class ChatList extends Block<ChatListProps, ChatListChildren> {
    constructor(props: ChatListProps) {
        super({
            ...props,
            ChatItems: chatStub.map(chat => new ChatItem({
                avatar: chat.avatar,
                name: chat.name,
                message: chat.message,
                unread: chat.unread,
                date: chat.date,
            })),
        });
    }

    render(): string {
        return `
            <div class="chat-list{{#if className}} {{ className }}{{/if}}">
                {{{ ChatItems }}}
            </div>
        `
    }
}

export default ChatList;
