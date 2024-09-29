import Block, { PageComponent } from './Block.ts';

type routeProps = {
    rootQuery: string;
};

class Route {
    _pathname: string;
    _blockClass: PageComponent;
    _props;
    _block: Block<Record<string, unknown>, object> | null;

    constructor(pathname: string, view: PageComponent, props: routeProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    leave() {

    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    _renderDom(query: string , block: Block<Record<string, unknown>, object>) {
        const root = document.querySelector(query);
        if (root) {
            root.innerHTML = '';
            root.append(block.getContent() as HTMLElement)
        };
    }

    render() {
        this._block = new this._blockClass({});
        this._renderDom(this._props.rootQuery, this._block);
    }
}

export default Route;
