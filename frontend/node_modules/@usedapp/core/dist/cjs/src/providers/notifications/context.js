"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotificationsContext = exports.NotificationsContext = void 0;
const react_1 = require("react");
const model_1 = require("./model");
exports.NotificationsContext = (0, react_1.createContext)({
    notifications: model_1.DEFAULT_NOTIFICATIONS,
    addNotification: () => undefined,
    removeNotification: () => undefined,
});
/**
 * @internal Intended for internal use - use it on your own risk
 */
function useNotificationsContext() {
    return (0, react_1.useContext)(exports.NotificationsContext);
}
exports.useNotificationsContext = useNotificationsContext;
//# sourceMappingURL=context.js.map