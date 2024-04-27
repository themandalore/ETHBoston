"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../src");
const chain_1 = require("./chain");
describe('chain', () => {
    const mainnet = src_1.ChainId.Mainnet;
    const ropsten = src_1.ChainId.Ropsten;
    const ganache = src_1.ChainId.Localhost;
    it('returns correct chain name from id', () => {
        const mainnetName = (0, chain_1.getChainName)(mainnet);
        (0, chai_1.expect)(mainnetName).to.eq('Mainnet');
    });
    it('tells correct if chain is test', () => {
        const isMainnetTest = (0, chain_1.isTestChain)(mainnet);
        const isRopstenTest = (0, chain_1.isTestChain)(ropsten);
        (0, chai_1.expect)(isMainnetTest).to.be.false;
        (0, chai_1.expect)(isRopstenTest).to.be.true;
    });
    it('tells correct if chain is local', () => {
        const isMainnetLocal = (0, chain_1.isLocalChain)(mainnet);
        const isGanacheLocal = (0, chain_1.isLocalChain)(ganache);
        (0, chai_1.expect)(isMainnetLocal).to.be.false;
        (0, chai_1.expect)(isGanacheLocal).to.be.true;
    });
});
//# sourceMappingURL=chain.test.js.map