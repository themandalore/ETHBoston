"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.objectEquals = exports.toEpoch = exports.zip = exports.fromJSON = exports.toJSON = exports.hexToU8Receiver = exports.fromBase64 = exports.toBase64 = exports.toHexString = exports.fromHexString = exports.fromBytes = exports.toBytes = void 0;
const deep_equal_1 = __importDefault(require("deep-equal"));
// TODO: Replace byte and hex manipulation with ethers.js
const toBytes = (str) => new TextEncoder().encode(str);
exports.toBytes = toBytes;
const fromBytes = (bytes) => new TextDecoder().decode(bytes);
exports.fromBytes = fromBytes;
const fromHexString = (hexString) => {
    if (hexString.startsWith('0x')) {
        hexString = hexString.slice(2);
    }
    const matches = hexString.match(/.{1,2}/g) ?? [];
    return new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
};
exports.fromHexString = fromHexString;
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
exports.toHexString = toHexString;
const toBase64 = (bytes) => btoa(String.fromCharCode(...bytes));
exports.toBase64 = toBase64;
const fromBase64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
exports.fromBase64 = fromBase64;
const hexToU8Receiver = (_key, value) => {
    if (typeof value === 'string' && value.startsWith('0x')) {
        return (0, exports.fromHexString)(value);
    }
    return value;
};
exports.hexToU8Receiver = hexToU8Receiver;
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
        return `0x${(0, exports.toHexString)(value)}`;
    }
    return value;
};
const sortedSerializingReplacer = (_key, value) => {
    const serializedValue = u8ToHexReplacer(_key, value);
    return sortedReplacer(_key, serializedValue);
};
const toJSON = (obj) => JSON.stringify(obj, sortedSerializingReplacer);
exports.toJSON = toJSON;
const fromJSON = (json) => JSON.parse(json, exports.hexToU8Receiver);
exports.fromJSON = fromJSON;
const zip = (a, b) => a.map((k, i) => [k, b[i]]);
exports.zip = zip;
const toEpoch = (date) => (date.getTime() / 1000) | 0;
exports.toEpoch = toEpoch;
const objectEquals = (a, b, strict = true) => (0, deep_equal_1.default)(a, b, { strict });
exports.objectEquals = objectEquals;
const omit = (obj, keys) => {
    const copy = { ...obj };
    keys.forEach((key) => delete copy[key]);
    return copy;
};
exports.omit = omit;
//# sourceMappingURL=utils.js.map