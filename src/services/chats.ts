import ChatsApi from "../api/chats";
import { CreateChat, ChatDTO, AddUserChat, Message } from "../api/type";
import { apiHasError } from "../utils/apiHasError";
import WebSocketService from "../core/WebSocket";

const chatsApi = new ChatsApi();

const getChats = async() => {
    const { response } = await chatsApi.chats() as XMLHttpRequest;

    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    return response as ChatDTO;
}

const create = async (data: CreateChat) => {
    const { response } = await chatsApi.createChat(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const chats = await getChats();

    window.store.set({chats: chats});
    window.router.go('/messenger');
}

const requestChatToken = async (data: { id: number, userId: number }) => {
    const { response } = await chatsApi.requestChatToken(data) as XMLHttpRequest;

    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    window.store.set({
        currentChat: data.id,
        token: response.token,
        messages: []
    });

    const webSocket = new WebSocketService(data.id, data.userId, response.token);
    webSocket.onMessage((newMessages) => {
        const state = window.store.getState();
        const oldMessages = state.messages as Message[];
        const parsedMessages = JSON.parse(newMessages);
        const messages = Array.isArray(parsedMessages) ? [...parsedMessages, ...oldMessages] : [parsedMessages, ...oldMessages]
        window.store.set({messages: messages})
    });
    window.webSocket = webSocket;
    webSocket.connect();

    return response.token;
}

const getUsers = async (data: { id: number }) => {
    const { response } = await chatsApi.getUsers(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    return response;
}

const addUser = async (data: AddUserChat) => {
    const { response } = await chatsApi.addUser(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const users = await getUsers({id: data.chatId});

    console.log('users', users);
}

const deleteUser = async (data: AddUserChat) => {
    const { response } = await chatsApi.deleteUser(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const users = await getUsers({id: data.chatId});

    console.log('users', users);
}

export {
    getChats,
    create,
    requestChatToken,
    addUser,
    deleteUser,
    getUsers
}