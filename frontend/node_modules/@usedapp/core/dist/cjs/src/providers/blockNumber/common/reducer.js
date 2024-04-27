"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockNumberReducer = void 0;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function blockNumberReducer(state = {}, action) {
    const current = state[action.chainId];
    if (!current || action.blockNumber > current) {
        return {
            ...state,
            [action.chainId]: action.blockNumber,
        };
    }
    return state;
}
exports.blockNumberReducer = blockNumberReducer;
//# sourceMappingURL=reducer.js.map