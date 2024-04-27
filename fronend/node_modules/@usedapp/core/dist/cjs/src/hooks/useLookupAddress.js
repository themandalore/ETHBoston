"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLookupAddress = void 0;
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
const ethers_1 = require("ethers");
/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) or Rave Names (e.g. `name.ftm`) for a specific address.
 * @param address address to lookup
 * @param options additional options
 * @returns {} Object with the following:
  - `ens: string | null | undefined` - ENS or Rave name of the account or null if not found.
  - `isLoading: boolean` - indicates whether the lookup is in progress.
  - `error: Error | null` - error that occurred during the lookup or null if no error occurred.
 * @public
 * @example
 * const { account } = useEthers()
 * const { ens } = useLookupAddress(account)
 *
 * return (
 *   <p>Account: {ens ?? account}</p>
 * )
 */
function useLookupAddress(address, { rave } = {}) {
    const { library } = (0, useEthers_1.useEthers)();
    const [ens, setENS] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        void (async () => {
            if (!library || !address)
                return;
            try {
                setIsLoading(true);
                if (rave) {
                    const raveContract = new ethers_1.Contract('0x14Ffd1Fa75491595c6FD22De8218738525892101', [
                        {
                            inputs: [
                                { internalType: 'address', name: 'owner', type: 'address' },
                                { internalType: 'uint256', name: 'index', type: 'uint256' },
                            ],
                            name: 'getName',
                            outputs: [{ internalType: 'string', name: '', type: 'string' }],
                            stateMutability: 'view',
                            type: 'function',
                        },
                    ], library);
                    // this call will fail anyway if the chain isn't Fantom, so we don't need an extra chainId check
                    const resolved = await raveContract.getName(address, 0);
                    if (!mounted)
                        return;
                    setENS(resolved);
                }
                else {
                    const resolved = await library.lookupAddress(address);
                    if (!mounted)
                        return;
                    setENS(resolved);
                }
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
    }, [address, library]);
    return { ens, isLoading, error };
}
exports.useLookupAddress = useLookupAddress;
//# sourceMappingURL=useLookupAddress.js.map