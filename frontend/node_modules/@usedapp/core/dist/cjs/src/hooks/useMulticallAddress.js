"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMulticallAddress = void 0;
const useChainState_1 = require("./useChainState");
/**
 * Returns an address of the multicall contract used on a given chain.
 * @public
 * @param queryParams see {@link QueryParams}.
 */
function useMulticallAddress(queryParams = {}) {
    var _a;
    return (_a = (0, useChainState_1.useChainState)(queryParams)) === null || _a === void 0 ? void 0 : _a.multicallAddress;
}
exports.useMulticallAddress = useMulticallAddress;
//# sourceMappingURL=useMulticallAddress.js.map