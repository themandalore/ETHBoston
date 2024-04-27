"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForSafeTransaction = exports.getLatestNonce = exports.calculateSafeTransactionHash = exports.sanitizeTransactionRequest = exports.buildSafeTransaction = exports.GNOSIS_SAFE_ABI = void 0;
const ethers_1 = require("ethers");
const chain_1 = require("./chain");
exports.GNOSIS_SAFE_ABI = [
    'function nonce() view returns (uint256)',
    'event ExecutionSuccess(bytes32 txHash, uint256 payment)',
];
const buildSafeTransaction = (template) => {
    return {
        to: template.to,
        value: template.value || 0,
        data: template.data || '0x',
        operation: template.operation || 0,
        safeTxGas: template.safeTxGas || 0,
        baseGas: template.baseGas || 0,
        gasPrice: template.gasPrice || 0,
        gasToken: template.gasToken || ethers_1.constants.AddressZero,
        refundReceiver: template.refundReceiver || ethers_1.constants.AddressZero,
        nonce: template.nonce || 0,
    };
};
exports.buildSafeTransaction = buildSafeTransaction;
const EIP712_SAFE_TX_TYPE = {
    SafeTx: [
        { type: 'address', name: 'to' },
        { type: 'uint256', name: 'value' },
        { type: 'bytes', name: 'data' },
        { type: 'uint8', name: 'operation' },
        { type: 'uint256', name: 'safeTxGas' },
        { type: 'uint256', name: 'baseGas' },
        { type: 'uint256', name: 'gasPrice' },
        { type: 'address', name: 'gasToken' },
        { type: 'address', name: 'refundReceiver' },
        { type: 'uint256', name: 'nonce' },
    ],
};
const sanitizeTransactionRequest = (transactionRequest) => {
    var _a;
    return {
        ...transactionRequest,
        data: (_a = transactionRequest.data) !== null && _a !== void 0 ? _a : '0x', // Non-empty data string is required on Gnosis Safe side.
    };
};
exports.sanitizeTransactionRequest = sanitizeTransactionRequest;
const calculateSafeTransactionHash = (safe, safeTx, chainId) => {
    // TODO: Remove after WalletConnectV2 fix
    // WalletConnectV2 incorrectly passes safeTxGas value, equal 0 (default value).
    // Thus we have a mismatch between gnosis safeTxHash and one calculated by useDApp (safeTxGas is based on estimation)
    safeTx = { ...safeTx, safeTxGas: 0 };
    return ethers_1.utils._TypedDataEncoder.hash({ verifyingContract: safe.address, chainId }, EIP712_SAFE_TX_TYPE, safeTx);
};
exports.calculateSafeTransactionHash = calculateSafeTransactionHash;
const getLatestNonce = async (chainId, safeAddress) => {
    var _a, _b, _c;
    try {
        const response = await fetch(`https://safe-transaction.${(_a = (0, chain_1.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.chainName}.gnosis.io/api/v1/safes/${safeAddress}/all-transactions?limit=1&executed=false&queued=true`);
        if (!response.ok)
            return null;
        const allTransactions = await response.json();
        const latestNonce = (_c = (_b = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions.results) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.nonce;
        if (!latestNonce)
            return null;
        return latestNonce;
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
};
exports.getLatestNonce = getLatestNonce;
const waitForSafeTransaction = async (transactionPromise, contract, chainId, safeTx) => {
    const safeTxHash = (0, exports.calculateSafeTransactionHash)(contract, safeTx, chainId);
    return new Promise((resolve, reject) => {
        void transactionPromise.catch((err) => {
            if ((err === null || err === void 0 ? void 0 : err.message) === 'Transaction was rejected') {
                reject(err);
            }
        });
        const onExecutionSuccess = async (txHash, _payment, event) => {
            if (txHash === safeTxHash) {
                contract.removeListener('ExecutionSuccess', onExecutionSuccess);
                const transaction = await event.getTransaction();
                const receipt = await event.getTransactionReceipt();
                resolve({ transaction, receipt, rejected: false });
            }
            else {
                const currentNonce = await contract.nonce();
                if (Number(currentNonce) > Number(safeTx.nonce)) {
                    contract.removeListener('ExecutionSuccess', onExecutionSuccess);
                    const transaction = await event.getTransaction();
                    const receipt = await event.getTransactionReceipt();
                    resolve({
                        transaction,
                        receipt,
                        rejected: true,
                    });
                }
            }
        };
        contract.on('ExecutionSuccess', onExecutionSuccess);
    });
};
exports.waitForSafeTransaction = waitForSafeTransaction;
//# sourceMappingURL=gnosisSafeUtils.js.map