type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

export default function isEqual(a: PlainObject, b: PlainObject): boolean {
    for (const key of Object.keys(a)) {
        if (isPlainObject(a[key]) && isPlainObject(b[key])) {
            if (isEqual(a[key], b[key])) continue;
            return false
        } else {
            if (a[key] !== b[key]) {
                return false;
            }
        }
    }
    return true;
}
