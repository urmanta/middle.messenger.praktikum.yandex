import Block from "../../core/Block";

type LinkProps = {
    page: string,
    label: string
}

type LinkChildren = {}

class Link extends Block<LinkProps, LinkChildren> {
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
