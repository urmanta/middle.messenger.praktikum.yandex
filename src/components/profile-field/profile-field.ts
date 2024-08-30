import Block from "../../core/Block";
import { Input } from "../input";

export default class ProfileField extends Block {
    constructor(props:any) {
        super({
            ...props,
            field: new Input({
                label: '',
                title: props.title,
                value: props.value,
                name: props.name,
                type: props.type,
                onBlur: props.onBlur,
                className: 'profile-field__element',
                readonly: props.readonly,
                'align-right': true
            })
        })
    }

    render(): string {
        return `
            <div class="profile-field{{#if className}} {{ className }}{{/if}}">
                <div class="profile-field__title">{{ title }}</div>
                {{{ field }}}
            </div>
        `
    }
}