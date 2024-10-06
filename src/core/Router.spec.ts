import { expect } from 'chai';
import sinon from 'sinon';
import globalJsdom from 'global-jsdom';
import Router from './Router';
import Route from './Route';
import Block, { Props, RefType } from './Block';

// Мок для PageComponent
class MockPage extends Block<Props, RefType> {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return '<div>MockPage</div>';
  }
}

// Мок для Route
class MockRoute extends Route {
  constructor() {
    super('/', MockPage, { rootQuery: 'app' });
  }

  match(pathname: string) {
    return pathname === '/';
  }

  leave() {
    return true;
  }

  render() {
    return true;
  }
}

describe('Router', () => {
  let router: Router;
  let mockRoute: MockRoute; let cleanup: () => void;

  before(() => {
    // Инициализация jsdom для симуляции браузерного окружения
    cleanup = globalJsdom();
  });

  after(() => {
    // Очистка jsdom после завершения тестов
    cleanup();
  });

  beforeEach(() => {
    router = new Router('app');
    mockRoute = new MockRoute();
  });

  it('should be a singleton', () => {
    const router1 = new Router('app');
    const router2 = new Router('app');
    expect(router1).to.equal(router2);
  });

  it('should use a new route', () => {
    router.use('/', MockPage);
    expect(router.routes.length).to.equal(1);
    expect(router.routes[0]).to.be.instanceOf(Route);
  });

  it('should navigate to a route', () => {
    const onRouteSpy = sinon.spy(router, '_onRoute');

    router.use('/main', MockPage);
    router.start();
    router.go('/main');

    expect(onRouteSpy.called).to.be.true;
    expect(router._currentRoute).to.not.be.null;
  });

  it('should call leave on current route when navigating to another route', () => {
    router.use('/', MockPage);
    const mockLeave = sinon.spy(mockRoute, 'leave');

    router._currentRoute = mockRoute;
    router.go('/other');

    expect(mockLeave.called).to.be.true;
  });

  it('should push state and navigate with go()', () => {
    const pushStateSpy = sinon.spy(router.history, 'pushState');

    router.use('/', MockPage);
    router.go('/new-route');

    expect(pushStateSpy.calledWith({}, '', '/new-route')).to.be.true;
    expect(router._currentRoute).to.not.be.null;
  });

  it('should call back() on history', () => {
    const backSpy = sinon.spy(router.history, 'back');

    router.back();

    expect(backSpy.called).to.be.true;
  });

  it('should call forward() on history', () => {
    const forwardSpy = sinon.spy(router.history, 'forward');

    router.forward();

    expect(forwardSpy.called).to.be.true;
  });

  it('should return the correct route in getRoute()', () => {
    router.use('/', MockPage);

    const route = router.getRoute('/');
    expect(route).to.not.be.null;
  });

  it('should return the error route when no matching route is found', () => {
    router.error(MockPage);

    const route = router.getRoute('/non-existent');
    expect(route).to.not.be.null;
  });
});
