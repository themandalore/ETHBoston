"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRawLogs = void 0;
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
const readonlyNetworks_1 = require("../providers/network/readonlyNetworks");
const hooks_1 = require("../hooks");
/**
 * Returns all blockchain logs given a block filter.
 * The hook will cause the component to refresh when a new block is mined and the returned logs change.
 * @see {@link useLogs} for a more easy-to-use version of the query.
 * @param filter an event filter, which blocks to query
 * @param queryParams allows for additional configuration of the query (see {@link QueryParams})
 * @returns an array of [logs](https://docs.ethers.io/v5/api/providers/types/#providers-Log)
 * @public
 */
function useRawLogs(filter, queryParams = {}) {
    const { library } = (0, useEthers_1.useEthers)();
    const providers = (0, readonlyNetworks_1.useReadonlyNetworks)();
    const _blockNumber = (0, hooks_1.useBlockNumber)();
    const blockNumbers = (0, hooks_1.useBlockNumbers)();
    const [logs, setLogs] = (0, react_1.useState)();
    const { chainId } = queryParams;
    const [provider, blockNumber] = (0, react_1.useMemo)(() => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]), [providers, library, blockNumbers, _blockNumber, chainId]);
    async function updateLogs() {
        setLogs(!filter ? undefined : await (provider === null || provider === void 0 ? void 0 : provider.getLogs(filter)));
    }
    (0, react_1.useEffect)(() => {
        void updateLogs();
    }, [provider, blockNumber]);
    return logs;
}
exports.useRawLogs = useRawLogs;
//# sourceMappingURL=useRawLogs.js.map