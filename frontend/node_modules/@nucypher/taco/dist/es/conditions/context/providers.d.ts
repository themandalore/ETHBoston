import { ethers } from 'ethers';
import { Eip712TypedData } from '../../web3';
export interface TypedSignature {
    signature: string;
    typedData: Eip712TypedData;
    address: string;
}
export declare class WalletAuthenticationProvider {
    private readonly provider;
    private readonly signer;
    private walletSignature?;
    constructor(provider: ethers.providers.Provider, signer: ethers.Signer);
    getOrCreateWalletSignature(): Promise<TypedSignature>;
    private createWalletSignature;
    private getChainData;
}
