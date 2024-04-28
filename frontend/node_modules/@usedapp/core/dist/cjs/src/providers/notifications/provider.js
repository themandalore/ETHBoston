"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hooks_1 = require("../../hooks");
const context_1 = require("./context");
const model_1 = require("./model");
const reducer_1 = require("./reducer");
const useIsMounted_1 = require("../../hooks/useIsMounted");
const nanoid_1 = require("nanoid");
function NotificationsProvider({ children }) {
    const [notifications, dispatch] = (0, react_1.useReducer)(reducer_1.notificationReducer, model_1.DEFAULT_NOTIFICATIONS);
    const isMounted = (0, useIsMounted_1.useIsMounted)();
    const { chainId, account } = (0, hooks_1.useEthers)();
    (0, react_1.useEffect)(() => {
        if (account && chainId) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                chainId: chainId,
                notification: {
                    type: 'walletConnected',
                    id: (0, nanoid_1.nanoid)(),
                    submittedAt: Date.now(),
                    address: account,
                },
            });
        }
    }, [account, chainId]);
    const addNotification = (0, react_1.useCallback)(({ notification, chainId }) => {
        if (isMounted()) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                chainId,
                notification: { ...notification, id: (0, nanoid_1.nanoid)() },
            });
        }
    }, [dispatch]);
    const removeNotification = (0, react_1.useCallback)(({ notificationId, chainId }) => {
        if (isMounted()) {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
                chainId,
                notificationId,
            });
        }
    }, [dispatch]);
    return ((0, jsx_runtime_1.jsx)(context_1.NotificationsContext.Provider, { value: { addNotification, notifications, removeNotification }, children: children }));
}
exports.NotificationsProvider = NotificationsProvider;
//# sourceMappingURL=provider.js.map