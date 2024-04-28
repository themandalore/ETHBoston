"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContractFunction = exports.connectContractToSigner = void 0;
const useConfig_1 = require("./useConfig");
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
const usePromiseTransaction_1 = require("./usePromiseTransaction");
const providers_1 = require("../providers");
const getSignerFromOptions_1 = require("../helpers/getSignerFromOptions");
/**
 * @internal Intended for internal use - use it on your own risk
 */
function connectContractToSigner(contract, options, librarySigner) {
    if (contract.signer) {
        return contract;
    }
    if (options && 'signer' in options) {
        return contract.connect(options.signer);
    }
    if (librarySigner) {
        return contract.connect(librarySigner);
    }
    throw new TypeError('No signer available in contract, options or library');
}
exports.connectContractToSigner = connectContractToSigner;
/**
 * Hook returns an object with four variables: ``state`` , ``send``, ``events`` , and ``resetState``.
 *
 * The `state` represents the status of transaction. See {@link TransactionStatus}.
 *
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 *
 * The `events` is a array of parsed transaction events of type [LogDescription](https://docs.ethers.io/v5/api/utils/abi/interface/#LogDescription).
 *
 * To send a transaction use `send` function returned by `useContractFunction`.
 * The function forwards arguments to ethers.js contract object, so that arguments map 1 to 1 with Solidity function arguments.
 * Additionally, there can be one extra argument - [TransactionOverrides](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend), which can be used to manipulate transaction parameters like gasPrice, nonce, etc
 *
 * If typechain contract is supplied as contract parameter then function name and send arguments will be type checked.
 * More on type checking [here](https://usedapp-docs.netlify.app/docs/Guides/Reading/Typechain).
 * @public
 * @param contract contract which function is to be called , also see [Contract](https://docs.ethers.io/v5/api/contract/contract/)
 * @param functionName name of function to call
 * @param options additional options of type {@link TransactionOptions}
 * @returns {} object with variables: `send` , `state` , `events`: `{ send: (...args: any[]) => void, state: TransactionStatus, events: LogDescription[] }`.
 *
 * @example
 * const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
 *
 * const depositEther = (etherAmount: string) => {
 *   send({ value: utils.parseEther(etherAmount) })
 * }
 * @example
 * const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })
 *
 * const withdrawEther = (wethAmount: string) => {
 *   send(utils.parseEther(wethAmount))
 * }
 */
function useContractFunction(contract, functionName, options) {
    var _a, _b, _c;
    const { library, chainId } = (0, useEthers_1.useEthers)();
    const transactionChainId = (options && 'chainId' in options && (options === null || options === void 0 ? void 0 : options.chainId)) || chainId;
    const { promiseTransaction, state, resetState } = (0, usePromiseTransaction_1.usePromiseTransaction)(transactionChainId, options);
    const [events, setEvents] = (0, react_1.useState)(undefined);
    const config = (0, useConfig_1.useConfig)();
    const gasLimitBufferPercentage = (_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.gasLimitBufferPercentage) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.bufferGasLimitPercentage) !== null && _b !== void 0 ? _b : config === null || config === void 0 ? void 0 : config.gasLimitBufferPercentage) !== null && _c !== void 0 ? _c : 0;
    const providers = (0, providers_1.useReadonlyNetworks)();
    const provider = (transactionChainId && providers[transactionChainId]);
    const send = (0, react_1.useCallback)(async (...args) => {
        var _a;
        if (contract) {
            const numberOfArgs = contract.interface.getFunction(functionName).inputs.length;
            const hasOpts = args.length > numberOfArgs;
            if (args.length !== numberOfArgs && args.length !== numberOfArgs + 1) {
                throw new Error(`Invalid number of arguments for function "${functionName}".`);
            }
            const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(provider, options, library);
            const contractWithSigner = connectContractToSigner(contract, options, signer);
            const opts = hasOpts ? args[args.length - 1] : undefined;
            const gasLimit = typeof opts === 'object' && Object.prototype.hasOwnProperty.call(opts, 'gasLimit')
                ? opts.gasLimit
                : (_a = (await (0, usePromiseTransaction_1.estimateContractFunctionGasLimit)(contractWithSigner, functionName, args, gasLimitBufferPercentage))) !== null && _a !== void 0 ? _a : null;
            const modifiedOpts = {
                gasLimit,
                ...opts,
            };
            const modifiedArgs = hasOpts ? args.slice(0, args.length - 1) : args;
            const receipt = await promiseTransaction(contractWithSigner[functionName](...modifiedArgs, modifiedOpts), {
                safeTransaction: {
                    to: contract.address,
                    value: opts === null || opts === void 0 ? void 0 : opts.value,
                    data: contract.interface.encodeFunctionData(functionName, modifiedArgs),
                    safeTxGas: gasLimit !== null && gasLimit !== void 0 ? gasLimit : undefined,
                },
            });
            if (receipt === null || receipt === void 0 ? void 0 : receipt.logs) {
                const events = receipt.logs.reduce((accumulatedLogs, log) => {
                    try {
                        return log.address.toLowerCase() === contract.address.toLowerCase()
                            ? [...accumulatedLogs, contract.interface.parseLog(log)]
                            : accumulatedLogs;
                    }
                    catch (_err) {
                        return accumulatedLogs;
                    }
                }, []);
                setEvents(events);
            }
            return receipt;
        }
    }, [contract, functionName, options, provider, library, gasLimitBufferPercentage, promiseTransaction]);
    return { send, state, events, resetState };
}
exports.useContractFunction = useContractFunction;
//# sourceMappingURL=useContractFunction.js.map