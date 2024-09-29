import Block from "../../core/Block";
import { Input } from "../input";

type ProfileFieldProps = {
    type?: string,
    name: string,
    placeholder?: string,
    value?: string,
    className?: string,
    readonly?: boolean,
    title: string,
    label?: string,
    error?: boolean,
    errorText?: string | undefined,
    'align-right'?: boolean,
    onBlur?: (e: Event) => void,
    onInput?: (e: Event) => void,
}

type ProfileFieldChildren = {
    Input: Input
}

export default class ProfileField extends Block<ProfileFieldProps, ProfileFieldChildren> {
    constructor(props: ProfileFieldProps) {
        super({
            ...props,
            Input: new Input({
                label: '',
                value: props.value,
                name: props.name,
                type: props.type,
                onBlur: props.onBlur,
                onInput: props.onInput,
                className: 'profile-field__element',
                readonly: props.readonly,
                error: props.error || false,
                errorText: props.errorText || undefined,
                'align-right': true
            })
        })
    }

    componentDidUpdate(oldProps: ProfileFieldProps, newProps: ProfileFieldProps): boolean {
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
