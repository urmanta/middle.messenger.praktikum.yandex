import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";
import { Link } from "../../components";

export default class ProfilePage extends Block {
    constructor(props: any) {
        super({
            ...props,
            profileWrapper: new Wrapper({
                profileBody: new Profile({
                    name: 'Селестия',
                    readonly: 'true',
                    controls: [
                        new Link({label: 'Изменить данные', page: 'profile-edit'}),
                        new Link({label: 'Изменить пароль', page: 'password-edit'}),
                        new Link({label: 'Выйти', page: 'login'})
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