"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactions = void 0;
const react_1 = require("react");
const providers_1 = require("../providers");
const useEthers_1 = require("./useEthers");
/**
 * `useTransactions` hook returns a list `transactions`. This list contains
 * all transactions that were sent using {@link useContractFunction} and {@link useSendTransaction}.
 * Transactions are stored in local storage and the status is rechecked on every new block.
 *
 * Each transaction has following type:
 *
 * ```
 * export interface StoredTransaction {
 *   transaction: TransactionResponse
 *   submittedAt: number
 *   receipt?: TransactionReceipt
 *   lastCheckedBlockNumber?: number
 *   transactionName?: string
 *   originalTransaction?: TransactionResponse
 * }
 * ```
 *
 * @see [Transaction Response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse)
 * @see [Transaction Receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt)
 * @public
 */
function useTransactions(queryParams = {}) {
    const { chainId: defaultChainId, account } = (0, useEthers_1.useEthers)();
    const { addTransaction, transactions } = (0, providers_1.useTransactionsContext)();
    const { chainId: _chainId } = queryParams;
    const chainId = (0, react_1.useMemo)(() => _chainId !== null && _chainId !== void 0 ? _chainId : defaultChainId, [_chainId, defaultChainId]);
    const filtered = (0, react_1.useMemo)(() => {
        var _a;
        if (chainId === undefined || !account) {
            return [];
        }
        return ((_a = transactions[chainId]) !== null && _a !== void 0 ? _a : []).filter((x) => x.transaction.from === account);
    }, [transactions, chainId, account]);
    return {
        transactions: filtered,
        addTransaction,
    };
}
exports.useTransactions = useTransactions;
//# sourceMappingURL=useTransactions.js.map