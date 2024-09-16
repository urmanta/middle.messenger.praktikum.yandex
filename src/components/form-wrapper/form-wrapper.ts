import Block from "../../core/Block";
import { PageTitle } from "../page-title";
import { FormRegistration, FormLoginComponent } from "../../components";


type FormWrapperProps = {
    title: string,
    FormBody: FormLoginComponent | FormRegistration,
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
