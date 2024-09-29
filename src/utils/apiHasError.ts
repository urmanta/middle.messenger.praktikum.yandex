import { APIError } from "../api/type";

export function apiHasError(response: { [key: string]: unknown }): response is APIError {
    return Boolean(response?.reason);
}
