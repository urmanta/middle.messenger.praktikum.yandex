type PlainObject<T = any> = {
    [k in string]: T;
};

export default function isEqual(a: PlainObject, b: PlainObject): boolean {
    for (const key of Object.keys(a)) {
        if (typeof a[key] === 'object' && typeof b[key] === 'object') {
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