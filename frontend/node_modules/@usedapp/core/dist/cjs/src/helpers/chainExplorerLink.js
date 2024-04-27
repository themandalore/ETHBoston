"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionLink = exports.getAddressLink = void 0;
const getAddressLink = (explorerUrl) => (address) => `${explorerUrl}/address/${address}`;
exports.getAddressLink = getAddressLink;
const getTransactionLink = (explorerUrl) => (txnId) => `${explorerUrl}/tx/${txnId}`;
exports.getTransactionLink = getTransactionLink;
//# sourceMappingURL=chainExplorerLink.js.map