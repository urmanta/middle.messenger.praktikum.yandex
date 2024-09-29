import Block, { Props } from "../../core/Block";
import { withRouter } from "../../utils";

interface LinkProps extends Props {
    page: string,
    label: string,
    className?: string,
    onClick?: (event: Event) => void
}

type LinkChildren = object

export class Link extends Block<LinkProps, LinkChildren> {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    if (props.onClick) props.onClick(e);
                    this.props.router!.go(props.page)
                }
            }
        })
    }

    render(): string {
        return `
            <a class="link{{#if className}} {{className}}{{/if}}">
                {{label}}
            </a>
        `
    }
}

export default withRouter<LinkProps>(Link);
