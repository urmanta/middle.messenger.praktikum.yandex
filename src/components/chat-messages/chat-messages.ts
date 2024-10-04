import Block, { Props } from "../../core/Block";
import { ChatMessage } from "../chat-message";
import { Message } from "../../api/type";

type ChatMessagesProps = Props & {
    messages: Message[]
}

type ChatMessagesChildren = {
    ChatMessages: InstanceType<typeof ChatMessage>[],
}

export default class ChatMessages extends Block<ChatMessagesProps, ChatMessagesChildren> {
    constructor(props: ChatMessagesProps) {
        // console.log('ChatMessages props', props);
        super({
            ...props,
            ChatMessages: Array.isArray(props.messages) ? props.messages?.map(message => new ChatMessage({...message})) : undefined,
        });
    }

    render(): string {
        return `
            <div class="chat-messages">
                {{{ ChatMessages }}}
            </div>
        `
    }
}
