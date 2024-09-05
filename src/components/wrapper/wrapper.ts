import Block from "../../core/Block";
import { Avatar } from "../avatar";
import { Password } from "../password";
import { Profile } from "../profile";

type WrapperProps = {
    ProfileBody: Password | Profile
}

type WrapperChildren = {
    Avatar: Avatar
}

export default class Wrapper extends Block<WrapperProps, WrapperChildren> {
    constructor(props: WrapperProps) {
        super({
            ...props,
            Avatar: new Avatar({})
        });
    }

    render() {
        return (
            `<div class="wrapper">
                <div class="wrapper__sidebar" page="chat"></div>
                <div class="wrapper__block">
                    <div class="profile__wrapper">
                        {{{ Avatar }}}
                        {{{ ProfileBody }}}
                    </div>
                </div>
            </div>`
        )
    }
}
