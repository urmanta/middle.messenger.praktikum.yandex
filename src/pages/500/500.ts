import Block from "../../core/Block";
import { Error } from "../../components/error";

class ServerError extends Block {
    constructor(props: any) {
        super({
            ...props,
            ErrorBlock: new Error({text: 'Сервис временно не доступен', code: '500'})
        })
    }

    render(): string {
        return `
            {{{ ErrorBlock }}}
        `
    }
}

export default ServerError;