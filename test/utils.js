const toBytes = (str) => new TextEncoder().encode(str);
const fromBytes = (bytes) => new TextDecoder().decode(bytes);
const fromHexString = (hexString) => {
    if (hexString.startsWith('0x')) {
        hexString = hexString.slice(2);
    }
    const matches = hexString.match(/.{1,2}/g) ?? [];
    return new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
};
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
const toBase64 = (bytes) => btoa(String.fromCharCode(...bytes));
const fromBase64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
const hexToU8Receiver = (_key, vale) => {
    if (typeof value === 'string' && value.startsWith('0x')) {
        return fromHexString(value);
    }
    return value;
};
const sortedReplacer = (_key, value) => {
    if (value instanceof Object && !(value instanceof Array)) {
        return Object.keys(value)
            .sort()
            .reduce((sorted, key) => {
            sorted[key] = value[key];
            return sorted;
        }, {});
    }
    return value;
};
const u8ToHexReplacer = (_key, value) => {
    if (value instanceof Uint8Array) {
        return `0x${toHexString(value)}`;
    }
    return value;
};
const sortedSerializingReplacer = (_key, value) => {
    const serializedValue = u8ToHexReplacer(_key, value);
    return sortedReplacer(_key, serializedValue);
};
const toJSON = (obj) => JSON.stringify(obj, sortedSerializingReplacer);
const fromJSON = (json) => JSON.parse(json, hexToU8Receiver);
const zip = (a, b) => a.map((k, i) => [k, b[i]]);
const toEpoch = (date) => (date.getTime() / 1000) | 0;
const objectEquals = (a, b) => (a == b);
const omit = (obj, keys) => {
    const copy = { ...obj };
    keys.forEach((key) => delete copy[key]);
    return copy;
};
//# sourceMappingURL=utils.js.map

module.exports = {
    toBytes,
    toHexString
}