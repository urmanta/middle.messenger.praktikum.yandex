import Block from "../../core/Block";
import { PageTitle } from "../page-title";
import { FormRegistration, FormLogin } from "../../components";


type FormWrapperProps = {
    title: string,
    FormBody: FormLogin | FormRegistration,
}

type FormWrapperChildren = {
    FormTitle: PageTitle
}

export default class FormWrapper extends Block<FormWrapperProps, FormWrapperChildren> {
    constructor(props: FormWrapperProps) {
        super({
            ...props,
            FormTitle: new PageTitle({title: props.title}),
        });
    }

    render() {
        return (
            `<div class="form">
                {{{ FormTitle }}}
                {{{ FormBody }}}
            </div>`
        )
    }
}
