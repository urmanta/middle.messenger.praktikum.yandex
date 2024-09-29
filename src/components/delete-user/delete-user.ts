import Block, { Props } from "../../core/Block";
import { PageTitle } from "../page-title";
import { Button } from "../button";
import { Input } from "../input";
import { deleteUser } from '../../services/chats';
import connect from "../../core/Connect";

type DeleteUserChildren = {
    DeleteUserTitle: PageTitle,
    DeleteUserField: Input,
    DeleteUserButton: Button
}

class DeleteUser extends Block<Props, DeleteUserChildren> {
    userID = 0;

    constructor(props: any) {
        super(props);
    }

    init() {
        const deleteUserToChatBind = this.deleteUserToChat.bind(this);
        const onChangeInputBind = this.onChangeInput.bind(this);

        const DeleteUserTitle = new PageTitle({title: 'Удалить пользователя'});
        const DeleteUserField = new Input({name: 'chat-name', label: 'ID пользователя', onBlur: onChangeInputBind});
        const DeleteUserButton = new Button({label: 'Удалить', onClick: deleteUserToChatBind, disabled: true});

        this.children = {
            ...this.children,
            DeleteUserTitle,
            DeleteUserField,
            DeleteUserButton
        }
    }

    onChangeInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.userID = Number(input.value);
        this.children.DeleteUserButton.setProps({disabled: !Boolean(this.userID && this.props.currentChat)});
        console.log('this.userID', this.userID);
    }

    deleteUserToChat() {
        const chatId = this.props.currentChat as number;
        const userId = this.userID as number;
        deleteUser({chatId: chatId, users: [userId]}).then(() => {
            const parentNode = this.element?.parentNode as HTMLElement;
            parentNode.style.display = "none";
        });
    }

    render(): string {
        return (
            `
                <div class="delete-user">
                    {{{ DeleteUserTitle }}}
                    {{{ DeleteUserField }}}
                    {{{ DeleteUserButton }}}
                </div>
            `
        );
    }
}

export default connect(({ currentChat }) => ({ currentChat }))(DeleteUser);
