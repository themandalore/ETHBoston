"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationReducer = void 0;
function notificationReducer(state, action) {
    var _a;
    const { chainId } = action;
    const chainState = (_a = state[chainId]) !== null && _a !== void 0 ? _a : [];
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                [chainId]: [action.notification, ...chainState],
            };
        case 'REMOVE_NOTIFICATION': {
            return {
                ...state,
                [chainId]: chainState.filter((notification) => notification.id !== action.notificationId),
            };
        }
    }
}
exports.notificationReducer = notificationReducer;
//# sourceMappingURL=reducer.js.map