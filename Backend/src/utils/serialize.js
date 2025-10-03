//Cree esta funcion porque los response en json no soportan BigInt y se debe parsear a Number
//Tambien los response que incluyen dates o decimals generan errores por lo que se deben parsear a String
export function toJSONSafe(value) {
    if (value === null || value === undefined) return value;

    const t = typeof value;
    if (t === 'bigint') {
        const num = Number(value);
        if (!Number.isSafeInteger(num)) {
            throw new Error(`BigInt fuera de rango seguro para Number: ${value}`);
        }
        return num;
    }

    if (t === 'object') {

        if (typeof value.toJSON === 'function') {
            return value.toJSON();
        }


        if (Array.isArray(value)) return value.map(toJSONSafe);
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, toJSONSafe(v)])
        );

    }

    return value;
}
