import Block from "../../core/Block";
import { Modal } from "../modal";
import AvatarChange from "./avatar-change";

type AvatarProps = {
    url?: string
}

type AvatarChildren = {
    ChangeAvatarModal: Modal
}

export default class Avatar extends Block<AvatarProps, AvatarChildren> {
    init() {

        const ChangeAvatarModal = new Modal({ModalBody: new AvatarChange({onChange: (newAvatar: string) => {this.setProps({url: newAvatar})}})});

        this.children = {
            ...this.children,
            ChangeAvatarModal
        }
    }
    constructor(props: AvatarProps) {
        super({
            ...props,
            events: {
                click: () => {
                    this.children.ChangeAvatarModal.show();
                }
            },
        });
    }

    render() {
        return (
            `<div>
                <div class="avatar">
                    {{#if url}} <img src="https://ya-praktikum.tech/api/v2/resources/{{ url }}" alt="">{{/if}}
                </div>
                {{{ ChangeAvatarModal }}}
            </div>`
        )
    }
}
