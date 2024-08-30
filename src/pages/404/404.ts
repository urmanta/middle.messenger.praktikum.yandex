import Block from "../../core/Block";
import { Error } from "../../components/error";

class NotFound extends Block {
    constructor(props: any) {
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