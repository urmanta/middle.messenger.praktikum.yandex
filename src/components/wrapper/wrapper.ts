import Block from "../../core/Block";
import {Avatar} from "../avatar";

export default class Wrapper extends Block {
    constructor(props: any) {
        super({
            ...props,
            avatar: new Avatar({})
        });
    }

    render() {
        return (
            `<div class="wrapper">
                <div class="wrapper__sidebar" page="chat"></div>
                <div class="wrapper__block">
                    <div class="profile__wrapper">
                        {{{ avatar }}}
                        {{{ profileBody }}}
                    </div>
                </div>
            </div>`
        )
    }
}