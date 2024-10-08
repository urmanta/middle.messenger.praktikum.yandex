export default function validatePhone(str: string): string | null {
  // Проверяем длину строки
  if (str.length < 10 || str.length > 15) {
    return 'Телефон должен содержать от 10 до 15 символов';
  }

  // Регулярное выражение для проверки формата строки
  const regex = /^\+?\d+$/;

  // Проверяем соответствие строки регулярному выражению
  if (!regex.test(str)) {
    return 'Телефон должен состоять из цифр, может начинается с плюса';
  }

  return null;
}
