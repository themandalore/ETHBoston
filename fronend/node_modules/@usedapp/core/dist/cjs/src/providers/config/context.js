"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigContext = void 0;
const react_1 = require("react");
const default_1 = require("../../model/config/default");
/**
 * @internal Intended for internal use - use it on your own risk
 */
exports.ConfigContext = (0, react_1.createContext)({
    config: default_1.DEFAULT_CONFIG,
    updateConfig: () => undefined,
});
//# sourceMappingURL=context.js.map