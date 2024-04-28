import { useEffect, useRef } from 'react';
import { Contract } from 'ethers';
import { GNOSIS_SAFE_ABI } from '../helpers/gnosisSafeUtils';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export const useGnosisSafeContract = (account, provider) => {
    const safeContract = useRef(undefined);
    useEffect(() => {
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
            safeContract.current = new Contract(account, GNOSIS_SAFE_ABI, provider);
            return safeContract.current;
        },
    };
};
//# sourceMappingURL=useGnosisSafeContract.js.map