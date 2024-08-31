import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";

export default class ProfilePage extends Block {
    constructor(props: any) {
        super({
            ...props,
            profileWrapper: new Wrapper({
                profileBody: new Profile({
                    mail: 'celestia@gmail.com',
                    login: 'celestia',
                    first_name: 'Селестия',
                    second_name: 'Принцесса',
                    display_name: 'Селестия',
                    phone: '+79099990090'
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