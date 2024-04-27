"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlockNumber = void 0;
const react_1 = require("react");
const providers_1 = require("../providers");
const connectors_1 = require("../providers/network/connectors");
const useChainId_1 = require("./useChainId");
const useDebounce_1 = require("./useDebounce");
const useIsMounted_1 = require("./useIsMounted");
/**
 * Get the current block number.
 * Will update automatically when the new block is mined.
 * @public
 */
function useBlockNumber() {
    const chainId = (0, useChainId_1.useChainId)();
    const readOnlyNetworks = (0, providers_1.useReadonlyNetworks)();
    const { connector } = (0, connectors_1.useConnector)();
    const [blockNumber, setBlockNumber] = (0, react_1.useState)();
    const isActive = (0, providers_1.useWindow)();
    const isMounted = (0, useIsMounted_1.useIsMounted)();
    (0, react_1.useEffect)(() => {
        if (!isActive) {
            return;
        }
        const readOnlyNetwork = chainId && readOnlyNetworks[chainId];
        if (readOnlyNetwork) {
            const unsub = (0, providers_1.subscribeToNewBlock)(readOnlyNetwork, chainId, ({ blockNumber }) => {
                if (isMounted()) {
                    setBlockNumber(blockNumber);
                }
            }, isActive);
            return () => unsub();
        }
        if (!connector) {
            return;
        }
        const unsub = connector.newBlock.on((blockNumber) => {
            if (isMounted()) {
                setBlockNumber(blockNumber);
            }
        });
        return () => unsub();
    }, [isActive, readOnlyNetworks, connector, chainId]);
    const debouncedBlockNumber = (0, useDebounce_1.useDebounce)(blockNumber, 100);
    return debouncedBlockNumber;
}
exports.useBlockNumber = useBlockNumber;
//# sourceMappingURL=useBlockNumber.js.map