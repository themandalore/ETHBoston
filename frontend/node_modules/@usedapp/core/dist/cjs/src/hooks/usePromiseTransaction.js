"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePromiseTransaction = exports.estimateContractFunctionGasLimit = exports.estimateTransactionGasLimit = void 0;
const react_1 = require("react");
const providers_1 = require("../providers");
const ethers_1 = require("ethers");
const gnosisSafeUtils_1 = require("../helpers/gnosisSafeUtils");
const useEthers_1 = require("./useEthers");
const gnosisSafeUtils_2 = require("../helpers/gnosisSafeUtils");
const useGnosisSafeContract_1 = require("./useGnosisSafeContract");
/**
 * @internal
 */
async function estimateTransactionGasLimit(transactionRequest, signer, gasLimitBufferPercentage) {
    if (!signer || !transactionRequest) {
        return undefined;
    }
    try {
        const estimatedGas = transactionRequest.gasLimit
            ? ethers_1.BigNumber.from(transactionRequest.gasLimit)
            : await signer.estimateGas(transactionRequest);
        return estimatedGas === null || estimatedGas === void 0 ? void 0 : estimatedGas.mul(gasLimitBufferPercentage + 100).div(100);
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
}
exports.estimateTransactionGasLimit = estimateTransactionGasLimit;
/**
 * @internal
 */
async function estimateContractFunctionGasLimit(contractWithSigner, functionName, args, gasLimitBufferPercentage) {
    try {
        const estimatedGas = await contractWithSigner.estimateGas[functionName](...args);
        const gasLimit = estimatedGas === null || estimatedGas === void 0 ? void 0 : estimatedGas.mul(gasLimitBufferPercentage + 100).div(100);
        return gasLimit;
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
}
exports.estimateContractFunctionGasLimit = estimateContractFunctionGasLimit;
/**
 * @internal
 */
async function isNonContractWallet(library, address) {
    if (!library || !address) {
        return true;
    }
    const code = await library.getCode(address);
    return code === '0x';
}
const isDroppedAndReplaced = (e) => (e === null || e === void 0 ? void 0 : e.code) === ethers_1.errors.TRANSACTION_REPLACED && (e === null || e === void 0 ? void 0 : e.replacement) && ((e === null || e === void 0 ? void 0 : e.reason) === 'repriced' || (e === null || e === void 0 ? void 0 : e.cancelled) === false);
function usePromiseTransaction(chainId, options) {
    const [state, setState] = (0, react_1.useState)({ status: 'None', transactionName: options === null || options === void 0 ? void 0 : options.transactionName });
    const { addTransaction, updateTransaction } = (0, providers_1.useTransactionsContext)();
    const { addNotification } = (0, providers_1.useNotificationsContext)();
    const { library, account } = (0, useEthers_1.useEthers)();
    const gnosisSafe = (0, useGnosisSafeContract_1.useGnosisSafeContract)(account, library);
    const resetState = (0, react_1.useCallback)(() => {
        setState(({ transactionName }) => ({ status: 'None', transactionName }));
    }, [setState]);
    const promiseTransaction = (0, react_1.useCallback)(async (transactionPromise, { safeTransaction } = {}, transactionRequest) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const handleNonContractWallet = async (transaction) => {
            if (!chainId)
                return;
            setState(({ transactionName }) => ({ transactionName, transaction, status: 'Mining' }));
            addTransaction({
                transaction: {
                    ...transaction,
                    chainId,
                },
                submittedAt: Date.now(),
                transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
            });
            const receipt = await transaction.wait();
            updateTransaction({
                transaction: {
                    ...transaction,
                    chainId: chainId,
                },
                receipt,
                transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
            });
            setState({
                receipt,
                transaction,
                status: 'Success',
                chainId,
                transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
            });
            return { transaction, receipt };
        };
        const handleContractWallet = async (transactionPromise, { safeTransaction } = {}) => {
            var _a;
            if (!chainId || !library || !account)
                return;
            setState({ status: 'CollectingSignaturePool', chainId, transactionName: options === null || options === void 0 ? void 0 : options.transactionName });
            const gnosisSafeContract = gnosisSafe.get();
            if (!gnosisSafeContract) {
                throw new Error("Couldn't create Gnosis Safe contract instance");
            }
            const latestNonce = await (0, gnosisSafeUtils_1.getLatestNonce)(chainId, account);
            const safeTx = (0, gnosisSafeUtils_1.buildSafeTransaction)({
                to: (_a = safeTransaction === null || safeTransaction === void 0 ? void 0 : safeTransaction.to) !== null && _a !== void 0 ? _a : '',
                value: safeTransaction === null || safeTransaction === void 0 ? void 0 : safeTransaction.value,
                data: safeTransaction === null || safeTransaction === void 0 ? void 0 : safeTransaction.data,
                safeTxGas: safeTransaction === null || safeTransaction === void 0 ? void 0 : safeTransaction.safeTxGas,
                nonce: latestNonce ? latestNonce + 1 : await gnosisSafeContract.nonce(),
            });
            const { transaction, receipt, rejected } = await (0, gnosisSafeUtils_2.waitForSafeTransaction)(transactionPromise, gnosisSafeContract, chainId, safeTx);
            if (rejected) {
                const errorMessage = 'On-chain rejection created';
                addTransaction({
                    transaction: {
                        ...transaction,
                        chainId: chainId,
                    },
                    receipt,
                    submittedAt: Date.now(),
                    transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                });
                setState({
                    status: 'Fail',
                    transaction,
                    receipt,
                    errorMessage,
                    chainId,
                    transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                });
            }
            else {
                addTransaction({
                    transaction: {
                        ...transaction,
                        chainId: chainId,
                    },
                    receipt,
                    submittedAt: Date.now(),
                    transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                });
                setState({
                    receipt,
                    transaction,
                    status: 'Success',
                    chainId,
                    transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                });
            }
            return { transaction, receipt };
        };
        if (!chainId)
            return;
        let transaction = undefined;
        try {
            setState({ status: 'PendingSignature', chainId, transactionName: options === null || options === void 0 ? void 0 : options.transactionName });
            if (options === null || options === void 0 ? void 0 : options.enablePendingSignatureNotification) {
                addNotification({
                    notification: {
                        type: 'transactionPendingSignature',
                        submittedAt: Date.now(),
                        transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                        transactionRequest,
                    },
                    chainId: chainId,
                });
            }
            const isContractWallet = !(await isNonContractWallet(library, account));
            if (isContractWallet) {
                const result = await handleContractWallet(transactionPromise, { safeTransaction });
                transaction = result === null || result === void 0 ? void 0 : result.transaction;
                return result === null || result === void 0 ? void 0 : result.receipt;
            }
            else {
                transaction = await transactionPromise;
                const result = await handleNonContractWallet(transaction);
                transaction = result === null || result === void 0 ? void 0 : result.transaction;
                return result === null || result === void 0 ? void 0 : result.receipt;
            }
        }
        catch (e) {
            const parsedErrorCode = parseInt((_g = (_e = (_c = (_b = (_a = e.error) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code) !== null && _c !== void 0 ? _c : (_d = e.error) === null || _d === void 0 ? void 0 : _d.code) !== null && _e !== void 0 ? _e : (_f = e.data) === null || _f === void 0 ? void 0 : _f.code) !== null && _g !== void 0 ? _g : e.code);
            const errorCode = isNaN(parsedErrorCode) ? undefined : parsedErrorCode;
            const errorHash = (_l = (_k = (_j = (_h = e === null || e === void 0 ? void 0 : e.error) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.originalError) === null || _k === void 0 ? void 0 : _k.data) !== null && _l !== void 0 ? _l : (_m = e === null || e === void 0 ? void 0 : e.error) === null || _m === void 0 ? void 0 : _m.data;
            const errorMessage = (_v = (_t = (_s = (_q = (_p = (_o = e.error) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.message) !== null && _q !== void 0 ? _q : (_r = e.error) === null || _r === void 0 ? void 0 : _r.message) !== null && _s !== void 0 ? _s : e.reason) !== null && _t !== void 0 ? _t : (_u = e.data) === null || _u === void 0 ? void 0 : _u.message) !== null && _v !== void 0 ? _v : e.message;
            if (transaction) {
                const droppedAndReplaced = isDroppedAndReplaced(e);
                if (droppedAndReplaced) {
                    const status = e.receipt.status === 0 ? 'Fail' : 'Success';
                    const type = status === 'Fail' ? 'transactionFailed' : 'transactionSucceed';
                    addNotification({
                        notification: {
                            type,
                            submittedAt: Date.now(),
                            transaction: e.replacement,
                            receipt: e.receipt,
                            transactionName: (_w = e.replacement) === null || _w === void 0 ? void 0 : _w.transactionName,
                            originalTransaction: transaction,
                        },
                        chainId,
                    });
                    setState((prevState) => {
                        var _a;
                        return ({
                            ...prevState,
                            status,
                            transaction: e.replacement,
                            originalTransaction: transaction,
                            receipt: e.receipt,
                            transactionName: (_a = e.replacement) === null || _a === void 0 ? void 0 : _a.transactionName,
                            errorMessage,
                            errorCode,
                            errorHash,
                            chainId,
                        });
                    });
                }
                else {
                    setState({
                        status: 'Fail',
                        transaction,
                        receipt: e.receipt,
                        errorMessage,
                        errorCode,
                        errorHash,
                        chainId,
                        transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                    });
                }
            }
            else {
                setState({
                    status: 'Exception',
                    errorMessage,
                    errorCode,
                    errorHash,
                    chainId,
                    transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
                });
            }
            return undefined;
        }
    }, [chainId, addNotification, options === null || options === void 0 ? void 0 : options.transactionName, library, account]);
    return { promiseTransaction, state, resetState };
}
exports.usePromiseTransaction = usePromiseTransaction;
//# sourceMappingURL=usePromiseTransaction.js.map