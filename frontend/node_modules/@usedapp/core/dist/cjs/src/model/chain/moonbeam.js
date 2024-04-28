"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moonbeam = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const moonbeamExplorerUrl = 'https://moonscan.io';
exports.Moonbeam = {
    chainId: 1284,
    chainName: 'Moonbeam',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x47152C4dCE75C77Bc9E52F5AAa2a20117971C365',
    rpcUrl: 'https://rpc.api.moonbeam.network',
    nativeCurrency: {
        name: 'GLMR',
        symbol: 'GLMR',
        decimals: 18,
    },
    blockExplorerUrl: moonbeamExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(moonbeamExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(moonbeamExplorerUrl),
};
exports.default = { Moonbeam: exports.Moonbeam };
//# sourceMappingURL=moonbeam.js.map