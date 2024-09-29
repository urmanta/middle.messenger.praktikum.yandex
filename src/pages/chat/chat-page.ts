import { AddChat, AddButton, Link, Search, ChatList, ChatHeader, ChatMessages, MessageField, Modal } from "../../components";
import Block from "../../core/Block";
import { ChatDTO, Message } from "../../api/type";
import connect from "../../core/Connect";

type ChatPageProps = {
    chats: ChatDTO[],
    messages: Message[],
    className?: string
}

type ChatPageChildren = {
    ToProfile: InstanceType<typeof Link>,
    SearchBlock: Search,
    ChatListBlock: ChatList,
    MessageFieldBlock: InstanceType<typeof MessageField>,
    AddChatButton: AddButton,
    AddChatModal: Modal,
    ChatHeaderBlock: ChatHeader,
    ChatMessagesBlock: InstanceType<typeof ChatMessages>
}

class ChatPage extends Block<ChatPageProps, ChatPageChildren> {
    init() {
        const ToProfile = new Link({label: 'Профиль', className: "chat-page__forward", page: '/settings'});
        const SearchBlock = new Search({className: "chat-page__search"});
        const ChatListBlock = new ChatList({className: "chat-page__list", chats: this.props.chats || []});
        const MessageFieldBlock = new MessageField({});
        const ChatHeaderBlock = new ChatHeader({});
        const ChatMessagesBlock = new ChatMessages({messages: this.props.messages});
        const AddChatButton = new AddButton({onClick: () => {this.children.AddChatModal.show()}});
        const AddChatModal = new Modal({ModalBody: new AddChat({})});

        this.children = {
            ...this.children,
            ToProfile,
            SearchBlock,
            ChatListBlock,
            MessageFieldBlock,
            AddChatButton,
            AddChatModal,
            ChatHeaderBlock,
            ChatMessagesBlock
        }
    }

    componentDidUpdate(oldProps: ChatPageProps, newProps: ChatPageProps): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.ChatMessagesBlock = new ChatMessages({messages: this.props.messages});

        return true;
    }

    render() {
        return `
            <div class="chat-page{{#if className}} {{ className }}{{/if}}">
                <div class="chat-page__wrapper">
                    <aside class="chat-page__sidebar">
                        <div class="chat-page__header" >
                            <div class="chat-page__navigation">
                                {{{ ToProfile }}}
                            </div>
                        </div>
                        {{{ ChatListBlock }}}
                        <div class="chat-page__add-chat">
                            {{{ AddChatButton }}}
                        </div>
                    </aside>
                    <div class="chat-page__chat">
                        {{#if currentChat}}
                            {{{ ChatHeaderBlock }}}
                            {{{ ChatMessagesBlock }}}
                            {{{ MessageFieldBlock }}}
                        {{/if}}
                    </div>
                    {{{ AddChatModal }}}
                </div>
            </div>
        `
    }
}

export default connect(({ currentChat, chats, messages }) => ({ currentChat, chats, messages }))(ChatPage)