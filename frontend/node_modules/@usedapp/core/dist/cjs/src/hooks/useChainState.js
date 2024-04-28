"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChainState = void 0;
const react_1 = require("react");
const providers_1 = require("../providers");
const useChainId_1 = require("./useChainId");
/**
 * @public
 */
function useChainState(queryParams = {}) {
    const multiChainState = (0, react_1.useContext)(providers_1.MultiChainStatesContext);
    const chainId = (0, useChainId_1.useChainId)({ queryParams });
    if (chainId === undefined) {
        return undefined;
    }
    return {
        ...multiChainState.chains[chainId],
        dispatchCalls: multiChainState.dispatchCalls,
    };
}
exports.useChainState = useChainState;
//# sourceMappingURL=useChainState.js.map