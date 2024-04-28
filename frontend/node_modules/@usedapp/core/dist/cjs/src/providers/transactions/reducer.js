"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionReducer = void 0;
function transactionReducer(state, action) {
    var _a, _b;
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            const { chainId } = action.payload.transaction;
            return {
                ...state,
                [chainId]: [action.payload, ...((_a = state[chainId]) !== null && _a !== void 0 ? _a : [])],
            };
        }
        case 'UPDATE_TRANSACTION': {
            const { chainId, hash } = action.payload.transaction;
            return {
                ...state,
                [chainId]: ((_b = state[chainId]) !== null && _b !== void 0 ? _b : []).map((tx) => tx.transaction.hash === hash ? { ...tx, ...action.payload } : tx),
            };
        }
        case 'UPDATE_TRANSACTIONS':
            return { ...state, [action.chainId]: [...action.transactions] };
    }
}
exports.transactionReducer = transactionReducer;
//# sourceMappingURL=reducer.js.map