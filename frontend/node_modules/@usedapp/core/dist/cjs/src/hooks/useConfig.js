"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateConfig = exports.useConfig = void 0;
const react_1 = require("react");
const helpers_1 = require("../helpers");
const providers_1 = require("../providers");
const validConfigs = (configs) => {
    if (!(configs === null || configs === void 0 ? void 0 : configs.networks) || (configs === null || configs === void 0 ? void 0 : configs.networks.length) === 0) {
        console.warn('No networks or supportedChain configured');
    }
    return configs;
};
/**
 * Returns singleton instance of {@link Config}.
 * Takes no parameters.
 * @public
 */
function useConfig() {
    var _a;
    const { config } = (0, react_1.useContext)(providers_1.ConfigContext);
    // backward compatible with supportedChains
    if (config.supportedChains) {
        console.warn('supportedChain is deprecated, please pass networks instead');
        const networks = (_a = config.supportedChains) === null || _a === void 0 ? void 0 : _a.map((chainId) => (0, helpers_1.getChainById)(chainId));
        return validConfigs({
            ...config,
            networks,
        });
    }
    return validConfigs(config);
}
exports.useConfig = useConfig;
/**
 * @public
 */
function useUpdateConfig() {
    const { updateConfig } = (0, react_1.useContext)(providers_1.ConfigContext);
    return updateConfig;
}
exports.useUpdateConfig = useUpdateConfig;
//# sourceMappingURL=useConfig.js.map