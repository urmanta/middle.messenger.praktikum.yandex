import { HTTPTransport } from '../core/HTTPTransport';
import { APIError, UserData, UserDTO } from './type';

const userApi = new HTTPTransport('/user');

export default class AuthApi {
  async saveUserProfile(data: UserData): Promise<unknown | void | APIError> {
    return userApi.put('/profile', { data });
  }

  async changeAvatar(data: FormData): Promise<unknown | UserDTO | APIError> {
    return userApi.sendFile('/profile/avatar', data);
  }

  async changePassword(data: { oldPassword: string, newPassword: string }): Promise<unknown | void | APIError> {
    return userApi.put('/password', { data });
  }
}
