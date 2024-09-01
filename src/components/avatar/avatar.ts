import Block from "../../core/Block";

export default class Avatar extends Block<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            `<div class="avatar"></div>`
        )
    }
}
