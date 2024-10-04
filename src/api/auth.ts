import { HTTPTransport } from "../core/HTTPTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
    async create(data: CreateUser): Promise<unknown | SignUpResponse> {
        return authApi.post('/signup', {data})
    }

    async login(data: LoginRequestData): Promise<unknown | void | APIError> {
        return authApi.post('/signin', {data});
    }

    async me(): Promise<unknown | UserDTO | APIError> {
        return authApi.get('/user');
    }

    async logout(): Promise<unknown | APIError> {
        return authApi.post('/logout')
    }
}
