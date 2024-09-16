import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Password } from "../../components/password";

type PasswordEditPageProps = {
    className?: string
}

type PasswordEditPageChildren = {
    ProfileWrapper: typeof Wrapper
}

export default class PasswordEditPage extends Block<PasswordEditPageProps, PasswordEditPageChildren> {
    constructor(props: PasswordEditPageProps) {
        super({
            ...props,
            ProfileWrapper: new Wrapper({
                ProfileBody: new Password({})
            })
        });
    }

    render() {
        return (
            `{{{ ProfileWrapper }}}`
        )
    }
}
