import Block from "../../core/Block";
import { AddChat } from "../add-chat";
import { AddUser } from "../add-user";
import { DeleteUser } from "../delete-user";
import AvatarChange from "../avatar/avatar-change";

type ModalProps = {
    ModalBody: InstanceType<typeof AddChat> | InstanceType<typeof AddUser> | InstanceType<typeof DeleteUser> | InstanceType<typeof AvatarChange>,
}

export default class Modal extends Block<ModalProps, object> {
    constructor(props: ModalProps) {
        super({
            ...props,
        });
    }

    render() {
        return (
            `<div class="modal">
                {{{ ModalBody }}}
            </div>`
        )
    }
}
