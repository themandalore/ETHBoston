import { StoredTransaction, StoredTransactions, UpdatedTransaction } from './model';
export declare const TransactionsContext: import("react").Context<{
    transactions: StoredTransactions;
    addTransaction: (payload: StoredTransaction) => void;
    updateTransaction: (payload: UpdatedTransaction) => void;
}>;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function useTransactionsContext(): {
    transactions: StoredTransactions;
    addTransaction: (payload: StoredTransaction) => void;
    updateTransaction: (payload: UpdatedTransaction) => void;
};
//# sourceMappingURL=context.d.ts.map