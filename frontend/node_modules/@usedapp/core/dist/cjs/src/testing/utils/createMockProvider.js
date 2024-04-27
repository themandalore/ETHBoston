"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = exports.createMockProvider = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const deployMulticall_1 = require("./deployMulticall");
const mineBlock_1 = require("./mineBlock");
const ganache_1 = __importDefault(require("ganache"));
/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
const createMockProvider = async (opts = {}) => {
    var _a;
    const chainId = (_a = opts.chainId) !== null && _a !== void 0 ? _a : constants_1.ChainId.Mainnet;
    const provider = new MockProvider(opts);
    const [deployer, ...wallets] = provider.getWallets();
    const multicallAddresses = await (opts.multicallVersion === 2
        ? (0, deployMulticall_1.deployMulticall2)(chainId, deployer)
        : (0, deployMulticall_1.deployMulticall)(chainId, deployer));
    return {
        provider,
        multicallAddresses,
        wallets,
        deployer,
        chainId,
        mineBlock: () => (0, mineBlock_1.mineBlock)(deployer),
    };
};
exports.createMockProvider = createMockProvider;
class MockProvider extends ethers_1.providers.Web3Provider {
    constructor(opts = {}) {
        var _a;
        const chainId = (_a = opts.chainId) !== null && _a !== void 0 ? _a : constants_1.ChainId.Mainnet;
        const accounts = _generateRandomWallets();
        const ganache = ganache_1.default.provider({
            chain: { chainId },
            wallet: { accounts },
            logging: { quiet: true },
        });
        super(ganache);
        this._wallets = accounts.map((a) => new ethers_1.Wallet(a.secretKey, this));
    }
    getWallets() {
        return this._wallets;
    }
    getAdminWallet() {
        return this._wallets[0];
    }
}
exports.MockProvider = MockProvider;
const _generateRandomWallets = () => {
    const balance = '0x1ED09BEAD87C0378D8E6400000000'; // 10^34
    const wallets = [];
    for (let i = 0; i < 10; i++) {
        wallets.push(ethers_1.Wallet.createRandom());
    }
    return wallets.map((w) => ({ balance, secretKey: w.privateKey }));
};
//# sourceMappingURL=createMockProvider.js.map