import { Wallet, providers } from 'ethers';
import { ChainId } from '../../constants';
import { deployMulticall, deployMulticall2 } from './deployMulticall';
import { mineBlock } from './mineBlock';
import Ganache from 'ganache';
/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export const createMockProvider = async (opts = {}) => {
    var _a;
    const chainId = (_a = opts.chainId) !== null && _a !== void 0 ? _a : ChainId.Mainnet;
    const provider = new MockProvider(opts);
    const [deployer, ...wallets] = provider.getWallets();
    const multicallAddresses = await (opts.multicallVersion === 2
        ? deployMulticall2(chainId, deployer)
        : deployMulticall(chainId, deployer));
    return {
        provider,
        multicallAddresses,
        wallets,
        deployer,
        chainId,
        mineBlock: () => mineBlock(deployer),
    };
};
export class MockProvider extends providers.Web3Provider {
    constructor(opts = {}) {
        var _a;
        const chainId = (_a = opts.chainId) !== null && _a !== void 0 ? _a : ChainId.Mainnet;
        const accounts = _generateRandomWallets();
        const ganache = Ganache.provider({
            chain: { chainId },
            wallet: { accounts },
            logging: { quiet: true },
        });
        super(ganache);
        this._wallets = accounts.map((a) => new Wallet(a.secretKey, this));
    }
    getWallets() {
        return this._wallets;
    }
    getAdminWallet() {
        return this._wallets[0];
    }
}
const _generateRandomWallets = () => {
    const balance = '0x1ED09BEAD87C0378D8E6400000000'; // 10^34
    const wallets = [];
    for (let i = 0; i < 10; i++) {
        wallets.push(Wallet.createRandom());
    }
    return wallets.map((w) => ({ balance, secretKey: w.privateKey }));
};
//# sourceMappingURL=createMockProvider.js.map