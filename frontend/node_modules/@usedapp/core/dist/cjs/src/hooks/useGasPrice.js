"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGasPrice = void 0;
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
const readonlyNetworks_1 = require("../providers/network/readonlyNetworks");
const hooks_1 = require("../hooks");
/**
 * Returns gas price of current network.
 * @public
 * @returns gas price of current network. `undefined` if not initialised.
 */
function useGasPrice(queryParams = {}) {
    const { library } = (0, useEthers_1.useEthers)();
    const providers = (0, readonlyNetworks_1.useReadonlyNetworks)();
    const _blockNumber = (0, hooks_1.useBlockNumber)();
    const blockNumbers = (0, hooks_1.useBlockNumbers)();
    const [gasPrice, setGasPrice] = (0, react_1.useState)();
    const { chainId } = queryParams;
    const [provider, blockNumber] = (0, react_1.useMemo)(() => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]), [providers, library, blockNumbers, _blockNumber]);
    async function updateGasPrice() {
        setGasPrice(await (provider === null || provider === void 0 ? void 0 : provider.getGasPrice()));
    }
    (0, react_1.useEffect)(() => {
        void updateGasPrice();
    }, [provider, blockNumber]);
    return gasPrice;
}
exports.useGasPrice = useGasPrice;
//# sourceMappingURL=useGasPrice.js.map