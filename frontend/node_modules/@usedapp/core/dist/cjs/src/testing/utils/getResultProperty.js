"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultPropertyError = exports.getResultProperty = void 0;
const getResultProperty = (result, property) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = result.current) === null || _a === void 0 ? void 0 : _a[property]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c[0];
};
exports.getResultProperty = getResultProperty;
const getResultPropertyError = (result, property) => {
    var _a, _b;
    return (_b = (_a = result.current) === null || _a === void 0 ? void 0 : _a[property]) === null || _b === void 0 ? void 0 : _b.error;
};
exports.getResultPropertyError = getResultPropertyError;
//# sourceMappingURL=getResultProperty.js.map