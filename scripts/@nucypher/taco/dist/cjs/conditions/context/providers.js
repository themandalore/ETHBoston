"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAuthenticationProvider = void 0;
const ethers_1 = require("ethers/lib/ethers");
class WalletAuthenticationProvider {
    provider;
    signer;
    walletSignature;
    constructor(provider, signer) {
        this.provider = provider;
        this.signer = signer;
    }
    async getOrCreateWalletSignature() {
        const address = await this.signer.getAddress();
        const storageKey = `wallet-signature-${address}`;
        // If we have a signature in localStorage, return it
        const isLocalStorage = typeof localStorage !== 'undefined';
        if (isLocalStorage) {
            const maybeSignature = localStorage.getItem(storageKey);
            if (maybeSignature) {
                return JSON.parse(maybeSignature);
            }
        }
        // If not, try returning from memory
        const maybeSignature = this.walletSignature?.[address];
        if (maybeSignature) {
            if (isLocalStorage) {
                localStorage.setItem(storageKey, maybeSignature);
            }
            return JSON.parse(maybeSignature);
        }
        // If at this point we didn't return, we need to create a new signature
        const typedSignature = await this.createWalletSignature();
        // Persist where you can
        if (isLocalStorage) {
            localStorage.setItem(storageKey, JSON.stringify(typedSignature));
        }
        if (!this.walletSignature) {
            this.walletSignature = {};
        }
        this.walletSignature[address] = JSON.stringify(typedSignature);
        return typedSignature;
    }
    async createWalletSignature() {
        // Ensure freshness of the signature
        const { blockNumber, blockHash, chainId } = await this.getChainData();
        const address = await this.signer.getAddress();
        const signatureText = `I'm the owner of address ${address} as of block number ${blockNumber}`;
        const salt = ethers_1.utils.hexlify(ethers_1.utils.randomBytes(32));
        const typedData = {
            types: {
                Wallet: [
                    { name: 'address', type: 'address' },
                    { name: 'signatureText', type: 'string' },
                    { name: 'blockNumber', type: 'uint256' },
                    { name: 'blockHash', type: 'bytes32' },
                ],
            },
            domain: {
                name: 'taco',
                version: '1',
                chainId,
                salt,
            },
            message: {
                address,
                signatureText,
                blockNumber,
                blockHash,
            },
        };
        // https://github.com/ethers-io/ethers.js/issues/1431#issuecomment-813950552
        const signature = await this.signer._signTypedData(typedData.domain, typedData.types, typedData.message);
        const formattedTypedData = {
            ...typedData,
            primaryType: 'Wallet',
            types: {
                ...typedData.types,
                EIP712Domain: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'version',
                        type: 'string',
                    },
                    {
                        name: 'chainId',
                        type: 'uint256',
                    },
                    {
                        name: 'salt',
                        type: 'bytes32',
                    },
                ],
            },
        };
        return { signature, typedData: formattedTypedData, address };
    }
    async getChainData() {
        const blockNumber = await this.provider.getBlockNumber();
        const blockHash = (await this.provider.getBlock(blockNumber)).hash;
        const chainId = (await this.provider.getNetwork()).chainId;
        return { blockNumber, blockHash, chainId };
    }
}
exports.WalletAuthenticationProvider = WalletAuthenticationProvider;
//# sourceMappingURL=providers.js.map