import Block from "../../core/Block";

type ButtonProps = {
    disabled?: boolean,
    className?: string,
    type?: string,
    page?: string,
    label: string,
    onClick: (event: Event) => void,
    events?: {
        [key: string]: (event: Event) => void;
    }
}

class Button extends Block<ButtonProps, object> {
    constructor(props: ButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        })
    }

    render(): string {
        return `
            <button 
                class="button button__{{type}}{{#if className}} {{className}}{{/if}}" 
                {{#if disabled}} disabled{{/if}}
            >
                {{label}}
            </button>
        `
    }
}

export default Button;
