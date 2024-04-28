"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArguments = void 0;
function validateArguments(args, assertions) {
    for (const key of Object.getOwnPropertyNames(args)) {
        if (typeof args[key] !== assertions[key]) {
            throw new Error(`Expected "${key}" to be of type "${assertions[key]}", got "${args[key]}" instead.`);
        }
    }
}
exports.validateArguments = validateArguments;
//# sourceMappingURL=validateArgument.js.map