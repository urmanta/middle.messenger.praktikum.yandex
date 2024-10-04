import Block from "../../core/Block";

type ChatMenuTriggerProps = {
    onClick: () => void
};

export default class ChatMenuTrigger extends Block<ChatMenuTriggerProps, object> {
    constructor(props: ChatMenuTriggerProps) {
        super({
            ...props,
            events: {
                click: () => this.props.onClick()
            }
        });

    }


    render(): string {
        return `
            <div class="chat-menu__trigger"></div>
        `
    }
}
