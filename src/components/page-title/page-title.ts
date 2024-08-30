import Block from "../../core/Block";

class PageTitle extends Block {
    constructor(props:any) {
        super(props)
    }

    render(): string {
        return `
            <h1 class="page-title">
                {{ title }}
            </h1>
        `
    }
}

export default PageTitle;