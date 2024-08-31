import { Link, Search, ChatList, MessageField } from "../../components";
import Block from "../../core/Block";

export default class ChatPage extends Block {

    init() {
        const ToLogin = new Link({label: 'Назад к логину', className: "chat-page__back", page: 'login'});
        const ToProfile = new Link({label: 'Профиль', className: "chat-page__forward", page: 'profile'});
        const SearchBlock = new Search({className: "chat-page__search"});
        const ChatListBlock = new ChatList({className: "chat-page__list"});
        const MessageFieldBlock = new MessageField({});

        this.children = {
            ...this.children,
            ToLogin,
            ToProfile,
            SearchBlock,
            ChatListBlock,
            MessageFieldBlock
        }

        this.name = 'LoginPage'
    }

    render() {
        return `
            <div class="chat-page">
                <div class="chat-page__wrapper">
                    <aside class="chat-page__sidebar">
                        <div class="chat-page__header" >
                            <div class="chat-page__navigation">
                                {{{ ToLogin }}}
                                {{{ ToProfile }}}
                            </div>
                            {{{ SearchBlock }}}
                        </div>
                        {{{ ChatListBlock }}}
                    </aside>
                    <div class="chat-page__chat">
                        {{{ MessageFieldBlock }}}
                    </div>
                </div>
            </div>
        `
    }
}