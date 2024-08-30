import Block from "../../core/Block";

class Link extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        })
    }

    render(): string {
        return `
            <a class="link{{#if className}} {{className}}{{/if}}" page={{page}} >
                {{label}}
            </a>
        `
    }
}

export default Link;