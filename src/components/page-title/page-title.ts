import Block from "../../core/Block";

type PageTitleProps = {
    title: string
}

type PageTitleChildren = object

class PageTitle extends Block<PageTitleProps, PageTitleChildren> {
    constructor(props: PageTitleProps) {
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
