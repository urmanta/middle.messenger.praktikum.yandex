import Block, { Props } from "../../core/Block";
import { PageTitle } from "../page-title";
import { Button } from "../button";
import { Input } from "../input";
import { addUser } from '../../services/chats';
import connect from "../../core/Connect";

type AddUserChildren = {
    AddUserTitle: PageTitle,
    AddUserField: Input,
    AddUserButton: Button
}

class AddUser extends Block<Props, AddUserChildren> {
    userID: number | undefined = undefined;

    constructor(props: Props) {
        super(props);
    }

    init() {
        const addUserToChatBind = this.addUserToChat.bind(this);
        const onChangeInputBind = this.onChangeInput.bind(this);

        const AddUserTitle = new PageTitle({title: 'Добавить пользователя'});
        const AddUserField = new Input({name: 'chat-name', label: 'ID пользователя', onBlur: onChangeInputBind});
        const AddUserButton = new Button({label: 'Добавить', onClick: addUserToChatBind, disabled: true});

        this.children = {
            ...this.children,
            AddUserTitle,
            AddUserField,
            AddUserButton
        }
    }

    onChangeInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.userID = Number(input.value);
        this.children.AddUserButton.setProps({disabled: !Boolean(this.userID && this.props.currentChat)});
        console.log('this.userID', this.userID);
    }

    addUserToChat() {
        const chatId = this.props.currentChat as number;
        const userId = this.userID as number;
        addUser({chatId: chatId, users: [userId]}).then(() => {
            const parentNode = this.element?.parentNode as HTMLElement;
            parentNode.style.display = "none";
        });
    }

    render(): string {
        return (
            `
                <div class="add-user">
                    {{{ AddUserTitle }}}
                    {{{ AddUserField }}}
                    {{{ AddUserButton }}}
                </div>
            `
        );
    }
}

export default connect(({ currentChat }) => ({ currentChat }))(AddUser);
