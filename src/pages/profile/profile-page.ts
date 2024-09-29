import Block from "../../core/Block";
import { Wrapper } from "../../components/wrapper";
import { Profile } from "../../components/profile";
import { UserDTO } from "../../api/type";
import connect from "../../core/Connect";

type ProfilePageProps = {
    className?: string,
    user: UserDTO
}

type ProfilePageChildren = {
    ProfileWrapper: InstanceType<typeof Wrapper>
}

class ProfilePage extends Block<ProfilePageProps, ProfilePageChildren> {
    constructor(props: ProfilePageProps) {
        super({
            ...props,
            ProfileWrapper: new Wrapper({
                ProfileBody: new Profile({
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

// @ts-ignore
export default connect(({ user }) => ({ user }))(ProfilePage);
