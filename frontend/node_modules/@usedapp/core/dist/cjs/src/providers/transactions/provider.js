"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hooks_1 = require("../../hooks");
const useIsMounted_1 = require("../../hooks/useIsMounted");
const context_1 = require("../notifications/context");
const context_2 = require("./context");
const model_1 = require("./model");
const reducer_1 = require("./reducer");
function TransactionProvider({ children }) {
    const { chainId, library } = (0, hooks_1.useEthers)();
    const { localStorage } = (0, hooks_1.useConfig)();
    const [storage, setStorage] = (0, hooks_1.useLocalStorage)(localStorage.transactionPath);
    const [transactions, dispatch] = (0, react_1.useReducer)(reducer_1.transactionReducer, storage !== null && storage !== void 0 ? storage : model_1.DEFAULT_STORED_TRANSACTIONS);
    const { addNotification } = (0, context_1.useNotificationsContext)();
    const isMounted = (0, useIsMounted_1.useIsMounted)();
    (0, react_1.useEffect)(() => {
        setStorage(transactions);
    }, [transactions]);
    const addTransaction = (0, react_1.useCallback)((payload) => {
        if (!isMounted()) {
            return;
        }
        dispatch({
            type: 'ADD_TRANSACTION',
            payload,
        });
        if (payload.receipt) {
            const type = payload.receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
            addNotification({
                notification: {
                    type,
                    submittedAt: Date.now(),
                    transaction: payload.transaction,
                    receipt: payload.receipt,
                    transactionName: payload.transactionName,
                },
                chainId: payload.transaction.chainId,
            });
            return;
        }
        addNotification({
            notification: {
                type: 'transactionStarted',
                transaction: payload.transaction,
                submittedAt: payload.submittedAt,
                transactionName: payload.transactionName,
            },
            chainId: payload.transaction.chainId,
        });
    }, [dispatch]);
    const updateTransaction = (0, react_1.useCallback)((payload) => {
        if (!isMounted()) {
            return;
        }
        dispatch({
            type: 'UPDATE_TRANSACTION',
            payload,
        });
        const type = payload.receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
        addNotification({
            notification: {
                type,
                submittedAt: Date.now(),
                transaction: payload.transaction,
                receipt: payload.receipt,
                transactionName: payload.transactionName,
            },
            chainId: payload.transaction.chainId,
        });
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        const updateTransactions = async () => {
            var _a;
            if (!chainId || !library)
                return;
            const blockNumber = await library.getBlockNumber();
            const checkTransaction = async (tx) => {
                if (tx.receipt || !shouldCheck(blockNumber, tx)) {
                    return tx;
                }
                try {
                    const receipt = await library.getTransactionReceipt(tx.transaction.hash);
                    if (receipt) {
                        const type = receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
                        addNotification({
                            notification: {
                                type,
                                submittedAt: Date.now(),
                                transaction: tx.transaction,
                                receipt,
                                transactionName: tx.transactionName,
                            },
                            chainId,
                        });
                        return { ...tx, receipt };
                    }
                    else {
                        return { ...tx, lastCheckedBlockNumber: blockNumber };
                    }
                }
                catch (error) {
                    console.error(`failed to check transaction hash: ${tx.transaction.hash}`, error);
                }
                return tx;
            };
            const chainTransactions = (_a = transactions[chainId]) !== null && _a !== void 0 ? _a : [];
            const newTransactions = [];
            for (const tx of chainTransactions) {
                const newTransaction = await checkTransaction(tx);
                newTransactions.push(newTransaction);
            }
            if (isMounted()) {
                dispatch({ type: 'UPDATE_TRANSACTIONS', chainId, transactions: newTransactions });
            }
        };
        void updateTransactions();
    }, [chainId, library]);
    return ((0, jsx_runtime_1.jsx)(context_2.TransactionsContext.Provider, { value: { transactions, addTransaction, updateTransaction }, children: children }));
}
exports.TransactionProvider = TransactionProvider;
function shouldCheck(blockNumber, tx) {
    if (tx.receipt) {
        return false;
    }
    if (!tx.lastCheckedBlockNumber) {
        return true;
    }
    const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber;
    if (blocksSinceCheck < 1) {
        return false;
    }
    const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60;
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9;
    }
    if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2;
    }
    // otherwise every block
    return true;
}
//# sourceMappingURL=provider.js.map