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
                {{#if url}} <img src=https://ya-praktikum.tech/api/v2/resources/{{ url }} alt="">{{/if}}
            </div>`
        )
    }
}
