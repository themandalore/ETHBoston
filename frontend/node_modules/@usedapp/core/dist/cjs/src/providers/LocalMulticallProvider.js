"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalMulticallProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ethers_1 = require("ethers");
const helpers_1 = require("../helpers");
const hooks_1 = require("../hooks");
const MultiCall_json_1 = __importDefault(require("../constants/abi/MultiCall.json"));
const MultiCall2_json_1 = __importDefault(require("../constants/abi/MultiCall2.json"));
const contract_1 = require("../helpers/contract");
var LocalMulticallState;
(function (LocalMulticallState) {
    LocalMulticallState[LocalMulticallState["Unknown"] = 0] = "Unknown";
    LocalMulticallState[LocalMulticallState["NonLocal"] = 1] = "NonLocal";
    LocalMulticallState[LocalMulticallState["Deploying"] = 2] = "Deploying";
    LocalMulticallState[LocalMulticallState["Deployed"] = 3] = "Deployed";
    LocalMulticallState[LocalMulticallState["Error"] = 4] = "Error";
})(LocalMulticallState || (LocalMulticallState = {}));
function LocalMulticallProvider({ children }) {
    const updateConfig = (0, hooks_1.useUpdateConfig)();
    const { library, chainId } = (0, hooks_1.useEthers)();
    const [, setMulticallAddress, getCurrent] = (0, hooks_1.useLocalStorage)('local_multicall_address' + chainId);
    const { multicallAddresses, multicallVersion } = (0, hooks_1.useConfig)();
    const [localMulticallState, setLocalMulticallState] = (0, react_1.useState)(LocalMulticallState.Unknown);
    const [multicallBlockNumber, setMulticallBlockNumber] = (0, react_1.useState)();
    const blockNumber = (0, hooks_1.useBlockNumber)();
    (0, react_1.useEffect)(() => {
        var _a;
        if (!library || !chainId) {
            setLocalMulticallState(LocalMulticallState.Unknown);
        }
        else if (!((_a = (0, helpers_1.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.isLocalChain)) {
            setLocalMulticallState(LocalMulticallState.NonLocal);
        }
        else if (multicallAddresses && multicallAddresses[chainId]) {
            setLocalMulticallState(LocalMulticallState.Deployed);
        }
        else if (localMulticallState !== LocalMulticallState.Deploying) {
            const checkDeployed = async () => {
                const multicallAddress = getCurrent();
                if (typeof multicallAddress === 'string' && ethers_1.utils.isAddress(multicallAddress)) {
                    const multicallCode = await library.getCode(multicallAddress);
                    if (multicallCode !== '0x') {
                        updateConfig({ multicallAddresses: { [chainId]: multicallAddress } });
                        return;
                    }
                }
                const signer = library && 'getSigner' in library ? library.getSigner() : undefined;
                if (!signer) {
                    setLocalMulticallState(LocalMulticallState.Error);
                    return;
                }
                setLocalMulticallState(LocalMulticallState.Deploying);
                const deployMulticall = async () => {
                    try {
                        const { contractAddress, blockNumber } = await (0, contract_1.deployContract)(multicallVersion === 1 ? MultiCall_json_1.default : MultiCall2_json_1.default, signer);
                        updateConfig({ multicallAddresses: { [chainId]: contractAddress } });
                        setMulticallAddress(contractAddress);
                        setMulticallBlockNumber(blockNumber);
                        setLocalMulticallState(LocalMulticallState.Deployed);
                    }
                    catch (_a) {
                        setLocalMulticallState(LocalMulticallState.Error);
                    }
                };
                void deployMulticall();
            };
            void checkDeployed();
        }
    }, [library, chainId]);
    const awaitingMulticallBlock = multicallBlockNumber && blockNumber && blockNumber < multicallBlockNumber;
    if (localMulticallState === LocalMulticallState.Deploying ||
        (localMulticallState === LocalMulticallState.Deployed && awaitingMulticallBlock)) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Deploying multicall..." });
    }
    else if (localMulticallState === LocalMulticallState.Error) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Error deploying multicall contract" });
    }
    else {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
}
exports.LocalMulticallProvider = LocalMulticallProvider;
//# sourceMappingURL=LocalMulticallProvider.js.map