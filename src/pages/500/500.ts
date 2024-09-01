import Block from "../../core/Block";
import { Error } from "../../components/error";

type ServerErrorProps = {}

type ServerErrorChildren = {
    ErrorBlock: Error,
}

class ServerError extends Block<ServerErrorProps, ServerErrorChildren> {
    constructor(props: ServerErrorProps) {
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
