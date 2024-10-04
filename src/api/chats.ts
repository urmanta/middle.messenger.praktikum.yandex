import { HTTPTransport } from "../core/HTTPTransport";
import { APIError, CreateChat, CreateChatResponse, ChatDTO, AddUserChat } from "./type";

const chatsApi = new HTTPTransport('/chats');

export default class AuthApi {
    async chats(): Promise<unknown | ChatDTO | APIError> {
        return chatsApi.get('/')
    }

    async createChat(data: CreateChat): Promise<unknown | CreateChatResponse> {
        return chatsApi.post('/', {data})
    }

    async requestChatToken(data: { id: number }): Promise<unknown | { token: string }> {
        return chatsApi.post(`/token/${data.id}`, {data})
    }

    async addUser(data: AddUserChat): Promise<unknown | void | APIError> {
        return chatsApi.put('/users', {data})
    }

    async deleteUser(data: AddUserChat): Promise<unknown | void | APIError> {
        return chatsApi.delete('/users', {data})
    }

    async getUsers(data: { id: number }): Promise<unknown | void | APIError> {
        return chatsApi.get(`/${data.id}/users/`)
    }
}
