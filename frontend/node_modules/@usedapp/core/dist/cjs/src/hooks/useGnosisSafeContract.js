"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGnosisSafeContract = void 0;
const react_1 = require("react");
const ethers_1 = require("ethers");
const gnosisSafeUtils_1 = require("../helpers/gnosisSafeUtils");
/**
 * @internal Intended for internal use - use it on your own risk
 */
const useGnosisSafeContract = (account, provider) => {
    const safeContract = (0, react_1.useRef)(undefined);
    (0, react_1.useEffect)(() => {
        return () => {
            var _a;
            (_a = safeContract.current) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        };
    }, []);
    return {
        get: () => {
            if (!account || !provider) {
                return undefined;
            }
            if (safeContract.current) {
                safeContract.current.removeAllListeners();
            }
            safeContract.current = new ethers_1.Contract(account, gnosisSafeUtils_1.GNOSIS_SAFE_ABI, provider);
            return safeContract.current;
        },
    };
};
exports.useGnosisSafeContract = useGnosisSafeContract;
//# sourceMappingURL=useGnosisSafeContract.js.map