import { useEthers } from './useEthers';
import { useState, useEffect } from 'react';
/**
 * Returns a signer if an external wallet is connected.
 * @public
 * @returns a JsonRpcSigner if one is available in the provider. `undefined` otherwise.
 */
export function useSigner() {
    const { library, account } = useEthers();
    const [signer, setSigner] = useState();
    useEffect(() => {
        if (library !== undefined && 'getSigner' in library && account !== undefined)
            setSigner(library.getSigner());
        else
            setSigner(undefined);
    }, [library, account]);
    return signer;
}
//# sourceMappingURL=useSigner.js.map