import ProfileApi from "../api/profile";
import { UserData } from "../api/type";
import { apiHasError } from "../utils/apiHasError";

const profileApi = new ProfileApi();

const saveUserProfile = async (data: UserData) => {
    const { response } = await profileApi.saveUserProfile(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    // window.store.set({user: response});

    return response;
}

const changeAvatar = async (data: FormData) => {
    const { response } = await profileApi.changeAvatar(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    return response;
}

const changePassword = async (data: { oldPassword: string, newPassword: string }) => {
    const { response } = await profileApi.changePassword(data) as XMLHttpRequest;
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
}

export {
    saveUserProfile,
    changeAvatar,
    changePassword
}
