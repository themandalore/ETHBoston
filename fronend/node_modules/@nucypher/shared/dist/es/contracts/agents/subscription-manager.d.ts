import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { Domain } from '../../porter';
import { ChecksumAddress } from '../../types';
export declare class PreSubscriptionManagerAgent {
    static createPolicy(provider: ethers.providers.Provider, signer: ethers.Signer, domain: Domain, valueInWei: BigNumber, policyId: Uint8Array, size: number, startTimestamp: number, endTimestamp: number, ownerAddress: ChecksumAddress): Promise<ContractTransaction>;
    static getPolicyCost(provider: ethers.providers.Provider, domain: Domain, size: number, startTimestamp: number, endTimestamp: number): Promise<BigNumber>;
    private static connectReadOnly;
    private static connectReadWrite;
    private static connect;
}
