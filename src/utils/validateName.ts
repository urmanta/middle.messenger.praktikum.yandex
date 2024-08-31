export default function validateName(str: string): string | null {
    // Регулярное выражение для проверки условий
    const regex = /^[А-ЯA-Z][а-яa-zА-ЯA-Z-]*$/;

    // Проверка строки на соответствие регулярному выражению
    return regex.test(str) ? '' : 'Допустима только латиница или кириллица, первая буква должна быть заглавной';
}