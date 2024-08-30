import Block from "../../core/Block";
import { PageTitle } from "../page-title";

export default class FormWrapper extends Block {
    constructor(props: any) {
        super({
            ...props,
            formTitle: new PageTitle({title: props.title}),
            events: {
                submit: props.onSubmit
            }
        });
    }

    render() {
        return (
            `<div class="form">
                {{{ formTitle }}}
                {{{ formBody }}}
            </div>`
        )
    }
}