export default function validateLogin (str: string): string | null {
    // Проверяем длину строки
    if (str.length < 3 || str.length > 20) {
        return 'Длина логина должна быть от 3 до 20 символов';
    }

    // Проверяем соответствие основным требованиям: латиница, цифры, дефис, нижнее подчёркивание
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(str)) {
        return 'Допустима только латиница, без пробелов, без спецсимволов';
    }

    // Проверяем, что строка не состоит только из цифр
    const isOnlyDigits = /^\d+$/.test(str);
    if (isOnlyDigits) {
        return 'Логин может содержать цифры, но не состоять из них';
    }

    // Если все проверки пройдены, строка валидна
    return null;
}