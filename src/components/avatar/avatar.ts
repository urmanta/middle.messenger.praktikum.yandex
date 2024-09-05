import Block from "../../core/Block";

type AvatarProps = {
    url?: string
}

export default class Avatar extends Block<AvatarProps, object> {
    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return (
            `<div class="avatar">
                {{#if url}} <img src={{ url }} alt="">{{/if}}
            </div>`
        )
    }
}
