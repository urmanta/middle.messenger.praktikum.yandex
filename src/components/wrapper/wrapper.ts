import Block, { Props } from "../../core/Block";
import { Password } from "../password";
import { Profile } from "../profile";
import { withRouter } from "../../utils";

interface WrapperProps extends Props {
    ProfileBody: InstanceType<typeof Password> | InstanceType<typeof Profile>
}

class Wrapper extends Block<WrapperProps, {}> {
    constructor(props: WrapperProps) {
        super({
            ...props,
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

export default withRouter<WrapperProps>(Wrapper);
