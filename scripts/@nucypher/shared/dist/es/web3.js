import { fromHexString } from './utils';
export var ChainId;
(function (ChainId) {
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["AMOY"] = 80002] = "AMOY";
    ChainId[ChainId["SEPOLIA"] = 11155111] = "SEPOLIA";
    ChainId[ChainId["ETHEREUM_MAINNET"] = 1] = "ETHEREUM_MAINNET";
})(ChainId || (ChainId = {}));
export const toCanonicalAddress = (address) => {
    const ethAddressStringPrefix = '0x';
    const nonPrefixed = address.startsWith(ethAddressStringPrefix)
        ? address.substring(ethAddressStringPrefix.length)
        : address;
    return fromHexString(nonPrefixed);
};
//# sourceMappingURL=web3.js.map