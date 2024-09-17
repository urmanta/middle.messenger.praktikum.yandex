import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";

type ProfileEditPageProps = {
    className?: string
}

type ProfileEditPageChildren = {
    ProfileWrapper: InstanceType<typeof Wrapper>
}

export default class ProfileEditPage extends Block<ProfileEditPageProps, ProfileEditPageChildren> {
    constructor(props: ProfileEditPageProps) {
        super({
            ...props,
            ProfileWrapper: new Wrapper({
                ProfileBody: new Profile({
                    isEditMode: true,
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
