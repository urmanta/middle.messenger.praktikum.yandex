import Block from "../../core/Block";

type ButtonProps = {
    className?: string,
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
                class="add-button {{#if className}} {{className}}{{/if}}"
            />
        `
    }
}

export default Button;
