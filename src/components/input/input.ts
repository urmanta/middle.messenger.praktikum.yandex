import Block from "../../core/Block";

type InputProps = {
    type?: string,
    readonly?: boolean,
    placeholder?: string,
    value?: string,
    className?: string,
    name?: string,
    events: {
        [key: string]: (event: Event) => void;
    }
}

class Input extends Block<InputProps, {}> {
    constructor(props: InputProps) {
        super(props)
    }

    render(): string {
        return `
            <input
                class="input__element"
                type="{{#if type}}{{ type }}{{else}}text{{/if}}"
                name={{ name }}
                value="{{#if value}}{{ value }}{{/if}}"
                placeholder="{{#if placeholder}} {{ placeholder }}{{/if}}"
                {{#if readonly}} readonly{{/if}}
            />
        `
    }
}

export default Input;
