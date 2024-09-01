import Block from "../../core/Block";

type LinkProps = {
    page: string,
    label: string,
    className?: string
}

type LinkChildren = object

class Link extends Block<LinkProps, LinkChildren> {
    constructor(props: LinkProps) {
        super({
            ...props
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
