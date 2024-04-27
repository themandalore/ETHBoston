import type { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
declare type NotificationPayload = {
    submittedAt: number;
} & ({
    type: 'transactionPendingSignature';
    transactionName?: string;
    transactionRequest?: TransactionRequest;
} | {
    type: 'transactionStarted';
    transaction: TransactionResponse;
    transactionName?: string;
} | {
    type: 'transactionSucceed';
    transaction: TransactionResponse;
    receipt: TransactionReceipt;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
} | {
    type: 'transactionFailed';
    transaction: TransactionResponse;
    receipt: TransactionReceipt;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
} | {
    type: 'walletConnected';
    address: string;
});
export declare type Notification = {
    id: string;
} & NotificationPayload;
export declare type AddNotificationPayload = {
    chainId: number;
    notification: NotificationPayload;
};
export declare type RemoveNotificationPayload = {
    chainId: number;
    notificationId: string;
};
export declare type Notifications = {
    [chainId: number]: Notification[];
};
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare const DEFAULT_NOTIFICATIONS: Notifications;
export {};
//# sourceMappingURL=model.d.ts.map