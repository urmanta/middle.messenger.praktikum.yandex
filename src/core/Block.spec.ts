import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import Block, { Props, RefType } from './Block';
import EventBus from './EventBus';

describe('Block', () => {
    let blockInstance: Block<Props, RefType>;
    let sandbox: SinonSandbox;

    let PageClass: typeof Block<Props, RefType>;

    before(() => {
        class Page extends Block<Props, RefType> {
            constructor(props: Props) {
                super({
                    ...props
                })
            }

            public render(): string {
                return `<div><span id="test-text">{{title}}</span></div>`
            }
        };

        PageClass = Page;
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        // Создание экземпляра с пустыми пропсами
        blockInstance = new PageClass({});
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should register events in EventBus when creating', () => {
        const eventBusSpy = sandbox.spy(EventBus.prototype, 'on');

        blockInstance = new Block({});

        expect(eventBusSpy.callCount).to.equal(5); // Регистрирует 5 событий
        expect(eventBusSpy.firstCall.args[0]).to.equal(Block.EVENTS.INIT);
        expect(eventBusSpy.secondCall.args[0]).to.equal(Block.EVENTS.FLOW_CDM);
        expect(eventBusSpy.thirdCall.args[0]).to.equal(Block.EVENTS.FLOW_CDU);
        expect(eventBusSpy.getCall(3).args[0]).to.equal(Block.EVENTS.FLOW_UNM);
        expect(eventBusSpy.getCall(4).args[0]).to.equal(Block.EVENTS.FLOW_RENDER);
    });

    it('should update props and call componentDidUpdate', () => {
        const componentDidUpdateSpy = sandbox.spy(blockInstance, 'componentDidUpdate');

        const oldProps = { title: 'Old Title' };
        blockInstance.setProps(oldProps);

        const newProps = { title: 'New Title' };
        blockInstance.setProps(newProps);

        expect(componentDidUpdateSpy.calledWith(oldProps, newProps)).to.be.true;
    });

    it('should hide element on call hide()', () => {
        const contentStub = { style: { display: 'flex' } };
        sandbox.stub(blockInstance, 'getContent').returns(contentStub as HTMLElement);

        blockInstance.hide();

        expect(contentStub.style.display).to.equal('none');
    });

    it('should show element on call show()', () => {
        const contentStub = { style: { display: 'none' } };
        sandbox.stub(blockInstance, 'getContent').returns(contentStub as HTMLElement);

        blockInstance.show();

        expect(contentStub.style.display).to.equal('flex');
    });

    it('should call _componentDidMount and dispatchComponentDidMount', () => {
        const componentDidMountSpy = sandbox.spy(blockInstance, 'componentDidMount');
        const dispatchSpy = sandbox.spy(blockInstance, 'dispatchComponentDidMount');

        blockInstance.dispatchComponentDidMount();

        expect(componentDidMountSpy.calledOnce).to.be.true;
        expect(dispatchSpy.calledOnce).to.be.true;
    });

    it('should dispatch event on element', () => {
        const handlerStub = sinon.stub();
        const blockInstance = new PageClass({events: {
                click: handlerStub
            }});

        const event = new MouseEvent('click');
        blockInstance.element?.dispatchEvent(event);

        expect(handlerStub.calledOnce).to.be.true;
    })

    it('should generate HTML-template', () => {
        blockInstance = new PageClass({ title: 'Test Title' });
        blockInstance.dispatchComponentDidMount();

        expect(blockInstance.getContent()?.innerHTML).to.equal('<span id="test-text">Test Title</span>');
    });
});
