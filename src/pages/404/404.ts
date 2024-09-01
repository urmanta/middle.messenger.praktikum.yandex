import Block from "../../core/Block";
import { Error } from "../../components/error";

type NotFoundProps = {}

type NotFoundChildren = {
    ErrorBlock: Error,
}

class NotFound extends Block<NotFoundProps, NotFoundChildren> {
    constructor(props: NotFoundProps) {
        super({
            ...props,
            ErrorBlock: new Error({text: 'Страница не найдена', code: '404'})
        })
    }

    render(): string {
        return `
            {{{ ErrorBlock }}}
        `
    }
}

export default NotFound;
