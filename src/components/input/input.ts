import Block from "../../core/Block";

class Input extends Block {
    constructor(props:any) {
        super(props)
    }

    render(): string {
        return `
            <input
                class="input__element{{#if className}} {{ className }}{{/if}}"
                type={{ type }}
                name={{ name }}
                value="{{#if value}} {{ value }}{{/if}}"
                placeholder="{{#if placeholder}} {{ placeholder }}{{/if}}"
                {{#if readonly}} readonly{{/if}}
            />
        `
    }
}

export default Input;