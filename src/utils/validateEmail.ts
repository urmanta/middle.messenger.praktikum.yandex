export default function validateEmail(str: string): string | null {
  // Регулярное выражение для проверки условия
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Проверяем соответствие строки регулярному выражению
  if (!regex.test(str)) {
    return 'Допустима только латиница, может включать цифры и спецсимволы, обязательно должна быть @';
  }

  // Проверяем, что перед точкой после "@" есть буквы
  const atIndex = str.indexOf('@');
  const lastDotIndex = str.lastIndexOf('.');

  if (lastDotIndex < atIndex) {
    return 'Почта должна содержать точку, но перед точкой обязательно должны быть буквы';
  }

  // Проверяем, что перед точкой хотя бы один символ - буква
  const domainPart = str.slice(atIndex + 1, lastDotIndex);
  const hasLettersBeforeDot = /[a-zA-Z]/.test(domainPart);

  if (!hasLettersBeforeDot) {
    return 'Почта должна содержать точку, но перед точкой обязательно должны быть буквы';
  }

  return null;
}
