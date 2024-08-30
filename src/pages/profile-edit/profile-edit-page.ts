import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";
import { Button } from "../../components/button";

export default class ProfileEditPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            profileWrapper: new Wrapper({
                profileBody: new Profile({
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