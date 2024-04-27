import type { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
export interface StoredTransaction {
    transaction: TransactionResponse;
    submittedAt: number;
    receipt?: TransactionReceipt;
    lastCheckedBlockNumber?: number;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
}
export declare type UpdatedTransaction = Omit<StoredTransaction, 'submittedAt'> & {
    receipt: TransactionReceipt;
};
/**
 * @public
 */
export declare function getStoredTransactionState(transaction: StoredTransaction): "Mining" | "Success" | "Fail";
export declare type StoredTransactions = {
    [chainId: number]: StoredTransaction[];
};
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare const DEFAULT_STORED_TRANSACTIONS: StoredTransactions;
//# sourceMappingURL=model.d.ts.map