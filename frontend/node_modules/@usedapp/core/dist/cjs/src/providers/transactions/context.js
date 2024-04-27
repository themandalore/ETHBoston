"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionsContext = exports.TransactionsContext = void 0;
const react_1 = require("react");
const model_1 = require("./model");
exports.TransactionsContext = (0, react_1.createContext)({
    transactions: model_1.DEFAULT_STORED_TRANSACTIONS,
    addTransaction: () => undefined,
    updateTransaction: () => undefined,
});
/**
 * @internal Intended for internal use - use it on your own risk
 */
function useTransactionsContext() {
    return (0, react_1.useContext)(exports.TransactionsContext);
}
exports.useTransactionsContext = useTransactionsContext;
//# sourceMappingURL=context.js.map