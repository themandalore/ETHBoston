"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChainMeta = void 0;
const react_1 = require("react");
const getChainMeta_1 = require("../helpers/getChainMeta");
/**
 * @public
 */
function useChainMeta(chainId) {
    return (0, react_1.useMemo)(() => (0, getChainMeta_1.getChainMeta)(chainId), [chainId]);
}
exports.useChainMeta = useChainMeta;
//# sourceMappingURL=useChainMeta.js.map