"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkStatesReducer = void 0;
function networkStatesReducer(prevState, actions) {
    var _a, _b;
    switch (actions.type) {
        case 'ADD_ERROR': {
            const newState = { ...prevState };
            newState[actions.chainId] = {
                ...newState[actions.chainId],
                errors: [...((_b = (_a = newState[actions.chainId]) === null || _a === void 0 ? void 0 : _a.errors) !== null && _b !== void 0 ? _b : []), actions.error],
            };
            return newState;
        }
        default:
            return prevState;
    }
}
exports.networkStatesReducer = networkStatesReducer;
//# sourceMappingURL=reducer.js.map