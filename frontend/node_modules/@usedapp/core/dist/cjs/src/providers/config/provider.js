"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const default_1 = require("../../model/config/default");
const context_1 = require("./context");
const reducer_1 = require("./reducer");
/**
 * We strip supplied config of undefined fields because it can easily break TS assumptions.
 *
 * Illustrative example:
 *
 * type FullConf = { something: string }
 * type PartConf = Partial<FullConf>
 *
 * const defaultConf: FullConf = { something: 'default' }
 * const suppliedConf: PartConf = { something: undefined }
 * const conf: FullConf = {...defaultConf, ...suppliedConf}
 * conf.something.toString() // OK according to TS, breaks on runtime.
 */
/**
 * @internal Intended for internal use - use it on your own risk
 */
const noUndefined = (x) => x !== undefined;
function ConfigProvider({ config, children }) {
    var _a;
    const configWithDefaults = {
        ...default_1.DEFAULT_CONFIG,
        ...(0, lodash_pickby_1.default)(config, noUndefined),
        bufferGasLimitPercentage: undefined,
        gasLimitBufferPercentage: (_a = config.gasLimitBufferPercentage) !== null && _a !== void 0 ? _a : config.bufferGasLimitPercentage,
        notifications: {
            ...default_1.DEFAULT_CONFIG.notifications,
            ...(0, lodash_pickby_1.default)(config.notifications, noUndefined),
        },
    };
    const [reducedConfig, dispatch] = (0, react_1.useReducer)(reducer_1.configReducer, configWithDefaults);
    return (0, jsx_runtime_1.jsx)(context_1.ConfigContext.Provider, { value: { config: reducedConfig, updateConfig: dispatch }, children: children });
}
exports.ConfigProvider = ConfigProvider;
//# sourceMappingURL=provider.js.map