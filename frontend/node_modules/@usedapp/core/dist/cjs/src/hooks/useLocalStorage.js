"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const LocalStorage_1 = __importDefault(require("../helpers/LocalStorage"));
const useConfig_1 = require("./useConfig");
function getItem(key, storage) {
    const item = storage.getItem(key);
    if (item !== null) {
        try {
            return JSON.parse(item);
        }
        catch (_a) {
            // ignore error
        }
    }
}
function setItem(key, value, storage) {
    if (value === undefined) {
        storage.removeItem(key);
    }
    else {
        const toStore = JSON.stringify(value);
        try {
            storage.setItem(key, toStore);
            return JSON.parse(toStore);
        }
        catch (err) {
            console.error('Error in localStorage', err);
            storage.removeItem(key);
        }
    }
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
function useLocalStorage(key) {
    const { localStorageOverride = typeof window !== 'undefined' ? window.localStorage : new LocalStorage_1.default(), } = (0, useConfig_1.useConfig)();
    const [value, setValue] = (0, react_1.useState)(() => getItem(key, localStorageOverride));
    (0, react_1.useEffect)(() => {
        setValue(getItem(key, localStorageOverride));
    }, [key]);
    (0, react_1.useEffect)(() => {
        setItem(key, value, localStorageOverride);
    }, [value]);
    // As value updating relies on useEffect, it takes multiple rerenders to fully update the value.
    // The third element in the return array allows to get the immediate value stored in the localStorage.
    return [value, setValue, () => getItem(key, localStorageOverride)];
}
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map