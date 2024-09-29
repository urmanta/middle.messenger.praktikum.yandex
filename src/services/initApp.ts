import { getUser } from "./auth";
import { getChats } from "./chats";

const initApp = async () => {
    let me = null;
    try {
        me = await getUser();
    } catch (error) {
        window.router.go('/');
        return;
    }

    const chats = await getChats();
    window.store.set({user: me, chats});
    window.router.go('/messenger');
}

const initChatPage = async () => {
    const chats = await getChats();
    window.store.set({chats});
}

export {
    initApp,
    initChatPage
}