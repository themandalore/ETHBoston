"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionErrored = void 0;
/**
 * @public
 */
function transactionErrored(transaction) {
    return 'errorMessage' in transaction;
}
exports.transactionErrored = transactionErrored;
//# sourceMappingURL=TransactionStatus.js.map