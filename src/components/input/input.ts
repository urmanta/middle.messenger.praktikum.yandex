import Block from "../../core/Block";

class Input extends Block {
    constructor(props:any) {
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