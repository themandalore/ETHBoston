"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotifications = void 0;
const react_1 = require("react");
const providers_1 = require("../providers");
const useEthers_1 = require("./useEthers");
const useInterval_1 = require("./useInterval");
const hooks_1 = require("../hooks");
function getExpiredNotifications(notifications, expirationPeriod) {
    if (expirationPeriod === 0) {
        return [];
    }
    const timeFromCreation = (creationTime) => Date.now() - creationTime;
    return notifications.filter((notification) => timeFromCreation(notification.submittedAt) >= expirationPeriod);
}
/**
 * ``useNotifications`` is a hook that is used to access notifications.
 * Notifications include information about: new transactions, transaction success or failure, as well as connection to a new wallet.
 *
 * To use this hook call:
 *
 * ```tsx
 *   const { notifications } = useNotifications()
 * ```
 *
 * `notifications` is an array of `NotificationPayload`.
 *
 * Each notification is removed from `notifications` after time declared in
 * `config.notifications.expirationPeriod`
 *
 * Each can be one of the following:
 *
 * ```tsx
 *   {
 *     type: 'walletConnected';
 *     address: string
 *   }
 * ```
 *
 * ```tsx
 *   {
 *     type: 'transactionStarted';
 *     submittedAt: number
 *     transaction: TransactionResponse;
 *     transactionName?: string
 *   }
 * ```
 *
 * ```tsx
 *   {
 *     type: 'transactionSucceed'
 *     transaction: TransactionResponse
 *     originalTransaction?: TransactionResponse
 *     receipt: TransactionReceipt
 *     transactionName?: string
 *   }
 * ```
 *
 * ```tsx
 *   {
 *     type: 'transactionFailed'
 *     transaction: TransactionResponse
 *     originalTransaction?: TransactionResponse
 *     receipt: TransactionReceipt
 *     transactionName?: string
 *   }
 * ```
 *
 * @public
 * @see [Transaction Response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse)
 * @see [Transaction Receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt)
 */
function useNotifications() {
    const { chainId, account } = (0, useEthers_1.useEthers)();
    const { addNotification, notifications, removeNotification } = (0, providers_1.useNotificationsContext)();
    const { notifications: { checkInterval, expirationPeriod }, } = (0, hooks_1.useConfig)();
    const chainNotifications = (0, react_1.useMemo)(() => {
        var _a;
        if (chainId === undefined || !account) {
            return [];
        }
        return (_a = notifications[chainId]) !== null && _a !== void 0 ? _a : [];
    }, [notifications, chainId, account]);
    (0, useInterval_1.useInterval)(() => {
        if (!chainId) {
            return;
        }
        const expiredNotification = getExpiredNotifications(chainNotifications, expirationPeriod);
        for (const notification of expiredNotification) {
            removeNotification({ notificationId: notification.id, chainId });
        }
    }, checkInterval);
    return {
        notifications: chainNotifications,
        addNotification,
        removeNotification,
    };
}
exports.useNotifications = useNotifications;
//# sourceMappingURL=useNotifications.js.map