"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResolveName = void 0;
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
/**
 * `useResolveName` is a hook that is used to resolve an ENS name (e.g. `name.eth`) to a specific address.
 * @param name ENS name to be resolved
 * @returns {} Object with the following:
  - `address: string | null | undefined` - resolved address for the given ENS name or null if not found.
  - `isLoading: boolean` - indicates whether the lookup is in progress.
  - `error: Error | null` - error that occurred during the lookup or null if no error occurred.
 * @public
 */
const useResolveName = (name) => {
    const { library } = (0, useEthers_1.useEthers)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [address, setAddress] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        let mounted = true;
        void (async () => {
            if (!library || !name)
                return;
            try {
                setIsLoading(true);
                const resolved = await library.resolveName(name);
                if (!mounted)
                    return;
                setAddress(resolved);
            }
            catch (e) {
                if (!mounted)
                    return;
                setError(e);
            }
            finally {
                setIsLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [library, name]);
    return { address, isLoading, error };
};
exports.useResolveName = useResolveName;
//# sourceMappingURL=useResolveName.js.map