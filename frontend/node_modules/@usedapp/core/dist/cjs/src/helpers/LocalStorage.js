"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalStorage {
    constructor() {
        this.data = {};
        this.length = 0;
    }
    clear() {
        this.data = {};
        this.length = 0;
    }
    getItem(key) {
        const item = this.data[key];
        return item || null;
    }
    key(index) {
        const keys = Object.keys(this.data);
        return keys[index] || null;
    }
    removeItem(key) {
        if (this.data[key]) {
            delete this.data[key];
            this.length--;
        }
    }
    setItem(key, value) {
        if (!this.data[key]) {
            this.length++;
        }
        this.data[key] = value;
    }
}
exports.default = LocalStorage;
//# sourceMappingURL=LocalStorage.js.map