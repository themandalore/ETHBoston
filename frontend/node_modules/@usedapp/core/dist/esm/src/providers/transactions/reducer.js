export function transactionReducer(state, action) {
    var _a, _b;
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            const { chainId } = action.payload.transaction;
            return Object.assign(Object.assign({}, state), { [chainId]: [action.payload, ...((_a = state[chainId]) !== null && _a !== void 0 ? _a : [])] });
        }
        case 'UPDATE_TRANSACTION': {
            const { chainId, hash } = action.payload.transaction;
            return Object.assign(Object.assign({}, state), { [chainId]: ((_b = state[chainId]) !== null && _b !== void 0 ? _b : []).map((tx) => tx.transaction.hash === hash ? Object.assign(Object.assign({}, tx), action.payload) : tx) });
        }
        case 'UPDATE_TRANSACTIONS':
            return Object.assign(Object.assign({}, state), { [action.chainId]: [...action.transactions] });
    }
}
//# sourceMappingURL=reducer.js.map