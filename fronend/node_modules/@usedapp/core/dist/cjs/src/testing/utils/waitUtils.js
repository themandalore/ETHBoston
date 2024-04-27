"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWaitUtils = void 0;
const waitUntil_1 = require("./waitUntil");
const getWaitUtils = (hookResult) => {
    const waitForCurrent = async (predicate, step, timeout) => {
        await (0, waitUntil_1.waitUntil)(() => predicate(hookResult.current), step, timeout);
    };
    const waitForCurrentEqual = async (value, step, timeout) => {
        await waitForCurrent((val) => val === value, step, timeout);
    };
    return {
        waitForCurrent,
        waitForCurrentEqual,
    };
};
exports.getWaitUtils = getWaitUtils;
//# sourceMappingURL=waitUtils.js.map