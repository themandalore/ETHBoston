"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const renderDAppHook_1 = require("./renderDAppHook");
const useContractFunction_1 = require("../hooks/useContractFunction");
const utils_1 = require("./utils");
describe('connectContractToSigner', () => {
    let token;
    let config;
    let network1;
    beforeEach(async () => {
        ;
        ({ config, network1 } = await (0, utils_1.setupTestingConfig)());
        token = new ethers_1.Contract(network1.deployer.address, __1.ERC20Interface);
    });
    it('throws error without signer', () => {
        (0, chai_1.expect)(() => (0, useContractFunction_1.connectContractToSigner)(token)).to.throw('No signer available in contract, options or library');
    });
    it('noop if contract has signer', () => {
        const signer = network1.provider.getSigner();
        const connectedContract = token.connect(signer);
        (0, chai_1.expect)((0, useContractFunction_1.connectContractToSigner)(connectedContract).signer).to.eq(signer);
    });
    it('takes signer from options', () => {
        const signer = network1.provider.getSigner();
        const connectedContract = (0, useContractFunction_1.connectContractToSigner)(token, { signer });
        (0, chai_1.expect)(connectedContract.signer).to.eq(signer);
    });
    it('takes signer from library', async () => {
        const { result, waitForCurrent } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, __1.useEthers)(), { config });
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.library) !== undefined);
        const { library } = result.current;
        const signer = library && 'getSigner' in library ? library.getSigner() : undefined;
        const connectedContract = (0, useContractFunction_1.connectContractToSigner)(token, undefined, signer);
        (0, chai_1.expect)(connectedContract.signer).to.be.deep.eq(signer);
    });
});
//# sourceMappingURL=connectContractToSigner.test.js.map