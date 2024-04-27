"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const provider_1 = require("./provider");
const chain_1 = require("../../../model/chain");
const testing_1 = require("../../../testing");
const JsonRpcProvider = ethers_1.providers.JsonRpcProvider;
describe('ReadonlyNetworksProvider', () => {
    it('getProvidersFromConfig creates provider for each network that has URL', async () => {
        const urls = {
            [chain_1.Mainnet.chainId]: 'mainnetUrl',
            [chain_1.Rinkeby.chainId]: 'rinkebyUrl',
            [chain_1.Kovan.chainId]: 'kovanUrl',
        };
        const providers = (0, provider_1.getProvidersFromConfig)(urls);
        (0, chai_1.expect)(Object.keys(providers)).to.deep.equal([
            chain_1.Mainnet.chainId.toString(),
            chain_1.Rinkeby.chainId.toString(),
            chain_1.Kovan.chainId.toString(),
        ]);
        (0, chai_1.expect)(providers[chain_1.Mainnet.chainId]).to.be.instanceOf(JsonRpcProvider);
    });
    it('getProvidersFromConfig fetches provider object', async () => {
        const mockProvider = new testing_1.MockProvider();
        const urls = {
            [chain_1.Localhost.chainId]: mockProvider,
        };
        const providers = (0, provider_1.getProvidersFromConfig)(urls);
        (0, chai_1.expect)(Object.keys(providers)).to.deep.equal([chain_1.Localhost.chainId.toString()]);
        (0, chai_1.expect)(providers[chain_1.Localhost.chainId]).to.eq(mockProvider);
    });
});
//# sourceMappingURL=readonlyNetworksProvider.test.js.map