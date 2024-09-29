export type APIError = {
    reason: string
};

export type SignUpResponse = {
    id: number
}

export type UserDTO = {
    id: number,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    avatar: string,
    phone: string,
    email: string,
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
    password: string
}

export type UserData = Omit<UserDTO, 'id' | 'avatar'>;

export type LoginRequestData = {
    login: string,
    password: string
}

export type CreateChat = {
    title: string
}

export type CreateChatResponse = {
    id: number
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
}

export type AddUserChat = {
    users: number[],
    chatId: number
}

export type Message = {
    chat_id: number,
    content: string,
    id: number,
    is_read: boolean,
    time: string,
    type: string,
    user_id: number
}
