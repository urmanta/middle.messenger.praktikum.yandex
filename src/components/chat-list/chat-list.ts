import Block from '../../core/Block';
import { ChatItem } from '../chat-item';
import { ChatDTO } from '../../api/type';

type ChatListProps = {
    chats: ChatDTO[],
    className?: string
}

type ChatListChildren = {
    ChatItems: InstanceType<typeof ChatItem>[],
}

class ChatList extends Block<ChatListProps, ChatListChildren> {
  constructor(props: ChatListProps) {
    super({
      ...props,
      ChatItems: props.chats.map((chat) => new ChatItem({ ...chat })),
    });
  }

  render(): string {
    return `
            <div class="chat-list{{#if className}} {{ className }}{{/if}}">
                {{{ ChatItems }}}
            </div>
        `;
  }
}

export default ChatList;
