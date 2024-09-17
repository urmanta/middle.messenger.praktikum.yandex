import Route from './Route';
import { PageComponent } from './Block';

class Router {
    private static __instance: Router | null = null;

    routes: Route[] = [];
    history!: History;
    private _currentRoute: Route | null = null;
    private _errorRoute: Route | null = null; // Хранение страницы ошибки
    readonly _rootQuery: string = 'app';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: PageComponent) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    error(block: PageComponent) {
        this._errorRoute = new Route('*', block, { rootQuery: this._rootQuery });
        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget;
            if (target) {
                this._onRoute((target as Window).location.pathname);
            }
        }).bind(this);
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this._currentRoute?.leave();
            if (this._errorRoute) {
                this._errorRoute.render();
                return;
            }
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        console.log('pathname >>>>> ', pathname);
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes.find(route => route.match(pathname));
        if(!route) {
            return this.routes.find(route => route.match('*'))
        }
        return route
    }
}

export default Router;