export const getResultProperty = (result, property) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = result.current) === null || _a === void 0 ? void 0 : _a[property]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c[0];
};
export const getResultPropertyError = (result, property) => {
    var _a, _b;
    return (_b = (_a = result.current) === null || _a === void 0 ? void 0 : _a[property]) === null || _b === void 0 ? void 0 : _b.error;
};
//# sourceMappingURL=getResultProperty.js.map