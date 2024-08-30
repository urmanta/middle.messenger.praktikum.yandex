import Block from "../../core/Block";

class Button extends Block {
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
            <button class="button button__{{type}}{{#if className}} {{className}}{{/if}}" page={{page}} >
                {{label}}
            </button>
        `
    }
}

export default Button;