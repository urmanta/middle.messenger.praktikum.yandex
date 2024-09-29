import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";
import { UserDTO } from "../../api/type";
import connect from "../../core/Connect";

type ProfileEditPageProps = {
    className?: string,
    user: UserDTO
}

type ProfileEditPageChildren = {
    ProfileWrapper: InstanceType<typeof Wrapper>
}

class ProfileEditPage extends Block<ProfileEditPageProps, ProfileEditPageChildren> {
    constructor(props: ProfileEditPageProps) {
        super({
            ...props,
            ProfileWrapper: new Wrapper({
                ProfileBody: new Profile({
                    isEditMode: true,
                    ...props.user
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

// @ts-expect-error
export default connect(({ user }) => ({ user }))(ProfileEditPage);
