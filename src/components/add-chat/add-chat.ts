import Block, { Props } from "../../core/Block";
import { PageTitle } from "../page-title";
import { Button } from "../button";
import { Input } from "../input";
import { create } from '../../services/chats';

type AddChatChildren = {
    AddChatTitle: PageTitle,
    AddChatField: Input,
    AddChatButton: Button
}

export default class AddChat extends Block<Props, AddChatChildren> {
    chatName = '';

    constructor(props: Props) {
        super(props);
    }

    init() {
        const createChatBind = this.createChat.bind(this);
        const onChangeInputBind = this.onChangeInput.bind(this);

        const AddChatTitle = new PageTitle({title: 'Добавить чат'});
        const AddChatField = new Input({name: 'chat-name', label: 'Имя чата', onBlur: onChangeInputBind});
        const AddChatButton = new Button({label: 'Добавить', onClick: createChatBind});

        this.children = {
            ...this.children,
            AddChatTitle,
            AddChatField,
            AddChatButton
        }
    }

    onChangeInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.chatName = input.value;
    }

    createChat() {
        create({title: this.chatName}).catch(error => {
            throw new Error(error)
        });
    }

    render(): string {
        return (
            `
                <div class="add-chat">
                    {{{ AddChatTitle }}}
                    {{{ AddChatField }}}
                    {{{ AddChatButton }}}
                </div>
            `
        );
    }
}
