import { StoredTransaction, StoredTransactions, UpdatedTransaction } from './model';
declare type Action = AddTransaction | UpdateTransaction | UpdateTransactions;
interface AddTransaction {
    type: 'ADD_TRANSACTION';
    payload: StoredTransaction;
}
interface UpdateTransaction {
    type: 'UPDATE_TRANSACTION';
    payload: UpdatedTransaction;
}
interface UpdateTransactions {
    type: 'UPDATE_TRANSACTIONS';
    chainId: number;
    transactions: StoredTransaction[];
}
export declare function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions;
export {};
//# sourceMappingURL=reducer.d.ts.map