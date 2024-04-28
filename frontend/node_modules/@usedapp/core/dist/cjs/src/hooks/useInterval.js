"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterval = void 0;
const react_1 = require("react");
// https://usehooks-typescript.com/react-hook/use-interval
/**
 * @internal Intended for internal use - use it on your own risk
 */
function useInterval(callback, delay) {
    const savedCallback = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(() => {
        savedCallback.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(() => {
        if (delay === null) {
            return;
        }
        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
}
exports.useInterval = useInterval;
//# sourceMappingURL=useInterval.js.map