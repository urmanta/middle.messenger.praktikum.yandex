import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";

type ProfilePageProps = {
    className?: string
}

type ProfilePageChildren = {
    ProfileWrapper: typeof Wrapper
}

export default class ProfilePage extends Block<ProfilePageProps, ProfilePageChildren> {
    constructor(props: ProfilePageProps) {
        super({
            ...props,
            ProfileWrapper: new Wrapper({
                ProfileBody: new Profile({
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
            `{{{ ProfileWrapper }}}`
        )
    }
}
