import Block, { Props } from "../../core/Block";
import { Avatar } from "../avatar";
import { Password } from "../password";
import { ProfileComponent } from "../profile";
import { withRouter } from "../../utils";

interface WrapperProps extends Props {
    ProfileBody: Password | ProfileComponent
}

type WrapperChildren = {
    Avatar: Avatar
}

export class WrapperComponent extends Block<WrapperProps, WrapperChildren> {
    constructor(props: WrapperProps) {
        super({
            ...props,
            Avatar: new Avatar({}),
            events: {
                click: (e) => {
                    const target = e.target as HTMLElement;
                    if (target.tagName === 'ASIDE') {
                        this.props.router!.go('/messenger')
                    }
                }
            }
        });
    }

    render() {
        return (
            `<div class="wrapper">
                <aside class="wrapper__sidebar"></aside>
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

export default withRouter<WrapperProps>(WrapperComponent);
