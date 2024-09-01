import Block from "../../core/Block";
import { Link } from "../link";

type ErrorProps = {}

type ErrorChildren = {
    LinkBackTo: Link,
}

class Error extends Block<ErrorProps, ErrorChildren> {
    constructor(props: ErrorProps) {
        super({
            ...props,
            LinkBackTo: new Link({page: 'chat', label: '< Вернуться к чатам', className: 'error__link'})
        })
    }

    render(): string {
        return `
            <div class="error">
                {{{ LinkBackTo }}}
                <div class="error__text">{{ text }}</div>
                <div class="error__code">{{ code }}</div>
            </div>
        `
    }
}

export default Error;
