import Block from "../../core/Block";
import { AddChat } from "../add-chat";
import { AddUser } from "../add-user";
import { DeleteUser } from "../delete-user";

type ModalProps = {
    ModalBody: InstanceType<typeof AddChat> | InstanceType<typeof AddUser> | InstanceType<typeof DeleteUser>,
}

type ModalWrapperChildren = {}

export default class Modal extends Block<ModalProps, ModalWrapperChildren> {
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

