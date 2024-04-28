"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSigner = void 0;
const useEthers_1 = require("./useEthers");
const react_1 = require("react");
/**
 * Returns a signer if an external wallet is connected.
 * @public
 * @returns a JsonRpcSigner if one is available in the provider. `undefined` otherwise.
 */
function useSigner() {
    const { library, account } = (0, useEthers_1.useEthers)();
    const [signer, setSigner] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (library !== undefined && 'getSigner' in library && account !== undefined)
            setSigner(library.getSigner());
        else
            setSigner(undefined);
    }, [library, account]);
    return signer;
}
exports.useSigner = useSigner;
//# sourceMappingURL=useSigner.js.map