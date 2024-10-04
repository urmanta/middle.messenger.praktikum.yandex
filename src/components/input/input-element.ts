import Block from "../../core/Block";
import ErrorLine from "./error-line";
import Input from "./input";

type InputElementProps = {
    type?: string,
    name: string,
    placeholder?: string,
    value?: string,
    className?: string,
    readonly?: boolean,
    label: string,
    error?: boolean,
    errorText?: string,
    'align-right'?: boolean,
    onBlur?: (e: Event) => void,
    onInput?: (e: Event) => void,
}

type InputElementChildren = {
    Input: Input,
    ErrorLine: ErrorLine
}

class InputElement extends Block<InputElementProps, InputElementChildren> {
    constructor(props: InputElementProps) {
        super({
            ...props,
            Input: new Input({
                type: props.type,
                name: props.name,
                placeholder: props.placeholder,
                value: props.value,
                className: props.className,
                readonly: props.readonly,
                events: {
                    blur: props.onBlur || (() => {}),
                    input: props.onInput || (() => {})
                }
            }),
            ErrorLine: new ErrorLine({
                errorText: props.errorText || ''
            })
        })
    }

    componentDidUpdate(oldProps: InputElementProps, newProps: InputElementProps): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.Input.setProps(newProps);
        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="input{{#if className}} {{ className }}{{/if}}{{#if error}} input__error{{/if}}" >
            <label class="input__container">
                {{{ Input }}}
                <div class="input__label">{{label}}</div>
            </label>
            {{{ ErrorLine }}}
        </div>
    `
    }
}

export default InputElement;
