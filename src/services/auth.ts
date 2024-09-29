import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData, UserDTO } from "../api/type";
import { apiHasError } from '../utils/apiHasError'

const authApi = new AuthApi();

const getUser = async() => {
    const { response } = await authApi.me() as XMLHttpRequest;

    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    return response as UserDTO;
}

const signin = async (data: LoginRequestData) => {
    const { response } = await authApi.login(data) as XMLHttpRequest;

    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const me = await getUser();

    window.store.set({user: me});
}

const signup = async (data: CreateUser) => {
    const { response } = await authApi.create(data) as XMLHttpRequest;

    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const me = await getUser();
    window.store.set({user: me});
}

const logout = async () => {
    await authApi.logout();
    window.store.set({user: null, chats: []});
    window.router.go('/')
}

export {
    signin,
    signup,
    logout,
    getUser
}