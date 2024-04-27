"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const testing_1 = require("../testing");
const getSignerFromOptions_1 = require("./getSignerFromOptions");
const chai_1 = require("chai");
describe('getSignerFromOptions', () => {
    let network1;
    let wallet1;
    beforeEach(async () => {
        ;
        ({ network1 } = await (0, testing_1.setupTestingConfig)());
        wallet1 = ethers_1.ethers.Wallet.fromMnemonic('radar blur cabbage chef fix engine embark joy scheme fiction master release');
    });
    it('returns signer for private key', () => {
        const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(network1.provider, {
            privateKey: wallet1.privateKey,
            chainId: 1,
        });
        (0, chai_1.expect)(signer).not.to.be.undefined;
    });
    it('returns signer for mnemonicPhrase', () => {
        const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(network1.provider, {
            mnemonicPhrase: wallet1.mnemonic.phrase,
            chainId: 1,
        });
        (0, chai_1.expect)(signer).not.to.be.undefined;
    });
    it('returns signer for encrypted json', async () => {
        const json = await wallet1.encrypt('test');
        const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(network1.provider, {
            json,
            password: 'test',
            chainId: 1,
        });
        (0, chai_1.expect)(signer).not.to.be.undefined;
    });
    it('returns signer for signer', () => {
        const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(network1.provider, {
            signer: wallet1,
        });
        (0, chai_1.expect)(signer).not.to.be.undefined;
    });
    it('returns signer for library', () => {
        const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(network1.provider, undefined, network1.provider);
        (0, chai_1.expect)(signer).not.to.be.undefined;
    });
    it('returns undefined for almost empty key arguments', () => {
        const signer = (0, getSignerFromOptions_1.getSignerFromOptions)(network1.provider);
        (0, chai_1.expect)(signer).to.be.undefined;
    });
});
//# sourceMappingURL=getSignerFromOptions.test.js.map