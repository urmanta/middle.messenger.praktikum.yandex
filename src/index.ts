import * as Pages from './pages';
import Router from './core/Router';
import Store from './core/Store';
import WebSocketService from "./core/WebSocket";
import { initApp } from './services/initApp';

declare global {
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    interface Window {
        router: Router;
        store: Store;
        webSocket: WebSocketService;
    }
}

window.store = new Store({
    loginField: null,
    loginError: null,
    chats: [],
    messages: [],
    user: null,
    currentChat: null
});

const router = new Router('#app');

window.router = router;

router
    .use('/', Pages.LoginPage)
    .use('/login', Pages.LoginPage)
    .use('/sign-up', Pages.RegistrationPage)
    .use('/settings', Pages.ProfilePage)
    .use('/settings-edit', Pages.ProfileEditPage)
    .use('/settings-password-edit', Pages.PasswordEditPage)
    .use('/messenger', Pages.ChatPage)
    .use('/404', Pages.NotFound)
    .use('/500', Pages.ServerError)
    .error(Pages.NotFound)
    .start();

document.addEventListener('DOMContentLoaded', () => initApp());

