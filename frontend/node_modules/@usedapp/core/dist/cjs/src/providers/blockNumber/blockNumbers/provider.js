"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockNumbersProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hooks_1 = require("../../../hooks");
const network_1 = require("../../network");
const context_1 = require("./context");
const reducer_1 = require("../common/reducer");
const subscribeToNewBlock_1 = require("../common/subscribeToNewBlock");
const window_1 = require("../../window");
const useIsMounted_1 = require("../../../hooks/useIsMounted");
function BlockNumbersProvider({ children }) {
    const networks = (0, network_1.useReadonlyNetworks)();
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.blockNumberReducer, {});
    const isActive = (0, window_1.useWindow)();
    const isMounted = (0, useIsMounted_1.useIsMounted)();
    (0, react_1.useEffect)(() => {
        const onUnmount = Object.entries(networks).map(([chainId, provider]) => (0, subscribeToNewBlock_1.subscribeToNewBlock)(provider, Number(chainId), (...args) => {
            if (isMounted()) {
                dispatch(...args);
            }
        }, isActive));
        return () => onUnmount.forEach((fn) => fn());
    }, [networks]);
    const debouncedState = (0, hooks_1.useDebounce)(state, 100);
    return (0, jsx_runtime_1.jsx)(context_1.BlockNumbersContext.Provider, { value: debouncedState, children: children });
}
exports.BlockNumbersProvider = BlockNumbersProvider;
//# sourceMappingURL=provider.js.map