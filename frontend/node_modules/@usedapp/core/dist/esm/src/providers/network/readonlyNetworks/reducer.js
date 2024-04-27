export function networkStatesReducer(prevState, actions) {
    var _a, _b;
    switch (actions.type) {
        case 'ADD_ERROR': {
            const newState = Object.assign({}, prevState);
            newState[actions.chainId] = Object.assign(Object.assign({}, newState[actions.chainId]), { errors: [...((_b = (_a = newState[actions.chainId]) === null || _a === void 0 ? void 0 : _a.errors) !== null && _b !== void 0 ? _b : []), actions.error] });
            return newState;
        }
        default:
            return prevState;
    }
}
//# sourceMappingURL=reducer.js.map