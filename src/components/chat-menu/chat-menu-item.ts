import Block from "../../core/Block";

type ChatMenuItemProps = {
    content: string,
    onClick: () => void
};

export default class  ChatMenuItem extends Block<ChatMenuItemProps, object> {
    constructor(props: ChatMenuItemProps) {
        super({
            ...props,
            events: {
                click: () => this.props.onClick()
            }
        });

    }

    render(): string {
        return `
            <div class="chat-menu__item">{{{ content }}}</div>
        `
    }
}
