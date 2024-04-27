import { ethers } from 'ethers';
import { Domain } from '../../porter';
import { ChecksumAddress } from '../../types';
export declare class GlobalAllowListAgent {
    static registerEncrypters(provider: ethers.providers.Provider, signer: ethers.Signer, domain: Domain, ritualId: number, encrypters: ChecksumAddress[]): Promise<void>;
    private static connectReadOnly;
    private static connectReadWrite;
    private static connect;
}
