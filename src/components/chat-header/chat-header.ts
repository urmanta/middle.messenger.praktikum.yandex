import Block from "../../core/Block";
import { ChatMenu } from "../chat-menu";

type ChatHeaderProps = {
    className?: string
};

export default class ChatHeader extends Block<ChatHeaderProps, object> {
    init() {
        const ChatMenuBlock = new ChatMenu({});

        this.children = {
            ...this.children,
            ChatMenuBlock
        }
    }

    render(): string {
        return `
            <div class="chat-header">
                {{{ ChatMenuBlock }}}
            </div>
        `
    }
}
