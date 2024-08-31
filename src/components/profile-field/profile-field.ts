import Block from "../../core/Block";
import { Input } from "../input";

export default class ProfileField extends Block {
    constructor(props:any) {
        super({
            ...props,
            Input: new Input({
                label: '',
                title: props.title,
                value: props.value,
                name: props.name,
                type: props.type,
                onBlur: props.onBlur,
                className: 'profile-field__element',
                readonly: props.readonly,
                error: props.error,
                errorText: props.errorText,
                'align-right': true
            })
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.Input.setProps(newProps);
        return true;
    }

    render(): string {
        return `
            <div class="profile-field{{#if className}} {{ className }}{{/if}}">
                <div class="profile-field__title">{{ title }}</div>
                {{{ Input }}}
            </div>
        `
    }
}