import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Password } from "../../components/password";
import { Button } from "../../components/button";

export default class PasswordEditPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            profileWrapper: new Wrapper({
                profileBody: new Password({
                    controls: [
                        new Button({label: 'Сохранить', page: 'profile', className: 'profile-page__save-button'}),
                    ]
                })
            })
        });
    }

    render() {
        return (
            `{{{ profileWrapper }}}`
        )
    }
}