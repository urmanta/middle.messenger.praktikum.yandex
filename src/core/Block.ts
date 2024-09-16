import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';
import Router from "./Router";

export interface PageComponent<P extends Props = { [key: string]: unknown }> {
    new (props: P): Block<P>;
}

export type RefType = {
    [key: string]: PageComponent
} | object

type EventHandlers = {
    [key: string]: (event: Event) => void;
};

export interface Props {
    [key: string]: unknown;
    router?: Router;
    events?: EventHandlers;
    attr?: { [key: string]: string | boolean };
}

export default class Block<BlockProps extends Props, Children extends RefType = RefType> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_UNM: 'flow:component-un-mount',
        FLOW_RENDER: 'flow:render',
    };

    protected _element: HTMLElement | null = null;

    protected _id: number = Math.floor(100000 + Math.random() * 900000);

    protected _needUpdate = true;

    public props: BlockProps;

    protected children: Children;

    protected lists: Record<string, unknown[]>;

    protected eventBus: () => EventBus;

    protected name: string = '';

    constructor(propsAndChildren: Partial<Props & Children>) {
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsAndChildren);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents(): void {
        const { events } = this.props;
        if (!events) return;
        Object.keys(events).forEach(eventName => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element!.removeEventListener(eventName, events[eventName]);
        });
    }

    protected removeEvents() {
        this._removeEvents();
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_UNM, this._componentWillUnmount.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
    }

    private _init(): void {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init(): void {}

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if (oldProps === newProps) return false;
        return true;
    }

    private _componentWillUnmount() {
        this._removeEvents();

        this.componentWillUnmount()

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((subChild) => {
                    subChild._componentWillUnmount();
                });
            } else {
                child._componentWillUnmount();
            }
        });
    }

    protected componentWillUnmount() {}

    private _getChildrenPropsAndProps(propsAndChildren: Partial<Props & Children> = {}): {
        children: Children,
        props: BlockProps,
        lists: Record<string, unknown[]>
    } {
        const children: Children = {} as Children;
        const props: BlockProps = {} as BlockProps;
        const lists: Record<string, unknown[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                (children as Record<string, unknown>)[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                (props as Record<string, unknown>)[key] = value;
            }
        });

        return { children, props, lists };
    }

    protected addAttributes(): void {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string);
            }
        });
    }

    public setProps = (nextProps: Partial<BlockProps>): void => {
        if (!nextProps) {
            return;
        }

        const oldProps = { ...this.props };

        Object.assign(this.props, nextProps);

        if (this._needUpdate) {
            this._removeEvents();
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
            this._needUpdate = false;
        }
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const propsAndStubs = { ...this.props };
        const _tmpId =  Math.floor(100000 + Math.random() * 900000);
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                (propsAndStubs as Record<string, unknown>)[key] = child.map(component => `<div data-id="${component._id}"></div>`)
            } else {
                (propsAndStubs as Record<string, unknown>)[key] = `<div data-id="${child._id}"></div>`;
            }
        });

        Object.entries(this.lists).forEach(([key]) => {
            (propsAndStubs as Record<string, unknown>)[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(component => {
                    const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
                    if (stub) {
                        stub.replaceWith(component.getContent());
                    }
                })
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                const content = child.getContent();
                if (stub && content) {
                    stub.replaceWith(content);
                }
            }
        });

        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template');
            child.forEach(item => {
                if (item instanceof Block) {
                    const content = item.getContent();
                    if (content) listCont.content.append(content);
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            if (stub) {
                stub.replaceWith(listCont.content);
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;

        this._addEvents();
        this.addAttributes();
    }

    public render(): string {
        return '';
    }

    public getContent(): HTMLElement | null {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    private _makePropsProxy(props: BlockProps): BlockProps {
        return new Proxy(props, {
            get: (target: BlockProps, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: BlockProps, prop: string, value: unknown) => {
                const oldTarget = { ...target };
                if (target[prop] != value) {
                    (target as Record<string, unknown>)[prop] = value;
                    this._needUpdate = true;
                }
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('No access');
            },
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    public show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'flex';
        }
    }

    public hide(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_UNM);
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
