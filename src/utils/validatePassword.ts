export default function validatePassword (str: string): string | null {
    // Проверяем длину строки
    if (str.length < 8 || str.length > 40) {
        return 'Пароль должен содержать от 8 до 40 символов';
    }

    // Проверяем, что в строке есть хотя бы одна заглавная буква и хотя бы одна цифра
    const hasUppercase = /[A-Z]/.test(str);
    const hasDigit = /\d/.test(str);

    // Если оба условия выполнены, возвращаем true, иначе false
    return (hasUppercase && hasDigit) ? null : 'Пароль должен содержать хотя бы одну заглавную букву и цифру';
}