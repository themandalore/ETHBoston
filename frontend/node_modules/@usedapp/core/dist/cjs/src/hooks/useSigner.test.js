"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const react_1 = require("react");
const testing_1 = require("../testing");
const useEthers_1 = require("./useEthers");
const useSigner_1 = require("./useSigner");
describe('useSigner', () => {
    let address;
    let config;
    before(async () => {
        address = ethers_1.Wallet.createRandom().address;
        window.ethereum = {
            request: async ({ method }) => {
                await (0, testing_1.sleep)(100);
                if (method === 'eth_requestAccounts' || method === 'eth_accounts')
                    return [address];
                else if (method === 'eth_chainId')
                    return ethers_1.BigNumber.from(31337).toHexString();
                else if (method === 'eth_blockNumber')
                    return ethers_1.BigNumber.from(1).toHexString();
            },
        };
    });
    after(() => {
        delete window.ethereum;
    });
    beforeEach(async () => {
        ;
        ({ config } = await (0, testing_1.setupTestingConfig)());
    });
    afterEach(() => {
        window.localStorage.clear();
    });
    it('signer defined', async () => {
        var _a;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const { activateBrowserWallet, account, error } = (0, useEthers_1.useEthers)();
            const signer = (0, useSigner_1.useSigner)();
            (0, react_1.useEffect)(() => {
                const t = setTimeout(() => {
                    activateBrowserWallet();
                }, 100);
                return () => {
                    clearTimeout(t);
                };
            }, []);
            return { signer, error, account };
        }, { config });
        await waitForCurrent((val) => val.account !== undefined && val.signer !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.signer).to.not.be.undefined;
        (0, chai_1.expect)(await ((_a = result.current.signer) === null || _a === void 0 ? void 0 : _a.getAddress())).to.equal(address);
    });
    it('signer undefined', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const signer = (0, useSigner_1.useSigner)();
            const { isLoading } = (0, useEthers_1.useEthers)();
            return { signer, isLoading };
        }, { config });
        await waitForCurrent((val) => val.isLoading == false);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.signer).to.eq(undefined);
    });
});
//# sourceMappingURL=useSigner.test.js.map