"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntil = exports.sleep = void 0;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
const waitUntil = async (predicate, step = 100, timeout = 10000) => {
    const stopTime = Date.now() + timeout;
    while (Date.now() <= stopTime) {
        const result = await predicate();
        if (result) {
            return result;
        }
        await (0, exports.sleep)(step);
    }
    throw new Error(`waitUntil timed out after ${timeout} ms`);
};
exports.waitUntil = waitUntil;
//# sourceMappingURL=waitUntil.js.map