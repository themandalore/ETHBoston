import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink';
const rootstockTestnetExplorerUrl = 'https://explorer.testnet.rsk.co/';
export const RootstockTestnet = {
    chainId: 31,
    chainName: 'Rootstock Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: 'https://public-node.testnet.rsk.co',
    nativeCurrency: {
        name: 'Test Rootstock Bitcoin',
        symbol: 'tRBTC',
        decimals: 18,
    },
    blockExplorerUrl: rootstockTestnetExplorerUrl,
    getExplorerAddressLink: getAddressLink(rootstockTestnetExplorerUrl),
    getExplorerTransactionLink: getTransactionLink(rootstockTestnetExplorerUrl),
};
const rootstockMainnetExplorerUrl = 'https://explorer.rsk.co/';
export const RootstockMainnet = {
    chainId: 30,
    chainName: 'Rootstock Mainnet',
    isTestChain: false,
    isLocalChain: false,
    rpcUrl: 'https://public-node.rsk.co',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    nativeCurrency: {
        name: 'Rootstock Bitcoin',
        symbol: 'RBTC',
        decimals: 18,
    },
    blockExplorerUrl: rootstockMainnetExplorerUrl,
    getExplorerAddressLink: getAddressLink(rootstockMainnetExplorerUrl),
    getExplorerTransactionLink: getTransactionLink(rootstockMainnetExplorerUrl),
};
export default { RootstockTestnet, RootstockMainnet };
//# sourceMappingURL=rootstock.js.map