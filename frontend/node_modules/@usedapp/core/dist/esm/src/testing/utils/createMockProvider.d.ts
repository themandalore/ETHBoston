import { Wallet, providers } from 'ethers';
import { ChainId, MulticallAddresses } from '../../constants';
export interface CreateMockProviderOptions {
    chainId?: ChainId;
    multicallVersion?: 1 | 2;
}
export interface CreateMockProviderResult {
    provider: MockProvider;
    multicallAddresses: MulticallAddresses;
    wallets: Wallet[];
    deployer: Wallet;
    chainId: ChainId;
    mineBlock: () => Promise<void>;
}
export declare type TestingNetwork = CreateMockProviderResult;
/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export declare const createMockProvider: (opts?: CreateMockProviderOptions) => Promise<CreateMockProviderResult>;
export declare class MockProvider extends providers.Web3Provider {
    private _wallets;
    constructor(opts?: {
        chainId?: number;
    });
    getWallets(): Wallet[];
    getAdminWallet(): Wallet;
}
//# sourceMappingURL=createMockProvider.d.ts.map