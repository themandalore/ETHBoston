"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const context_1 = require("./context");
/**
 * @internal Intended for internal use - use it on your own risk
 */
function WindowProvider({ children }) {
    const [isActiveWindow, setActiveWindow] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (typeof document === 'undefined') {
            return;
        }
        const visibilityChangeListener = () => {
            switch (document.visibilityState) {
                case 'hidden':
                    setActiveWindow(false);
                    break;
                case 'visible':
                    setActiveWindow(true);
                    break;
            }
        };
        document.addEventListener('visibilitychange', visibilityChangeListener);
        return () => document.removeEventListener('visibilitychange', visibilityChangeListener);
    }, []);
    return (0, jsx_runtime_1.jsx)(context_1.WindowContext.Provider, { value: isActiveWindow, children: children });
}
exports.WindowProvider = WindowProvider;
//# sourceMappingURL=provider.js.map