"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChainId = void 0;
const connectors_1 = require("../providers/network/connectors");
const hooks_1 = require("../hooks");
/**
 * Internal hook for reading current chainId for calls.
 * @internal Intended for internal use - use it on your own risk
 */
function useChainId(opts = {}) {
    var _a, _b, _c;
    const { chainId } = (0, connectors_1.useConnector)();
    const { readOnlyChainId } = (0, hooks_1.useConfig)();
    return (_c = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.queryParams) === null || _a === void 0 ? void 0 : _a.chainId) !== null && _b !== void 0 ? _b : chainId) !== null && _c !== void 0 ? _c : readOnlyChainId;
}
exports.useChainId = useChainId;
//# sourceMappingURL=useChainId.js.map