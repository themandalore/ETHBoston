import { ERC20Interface, useEthers } from '..';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { renderDAppHook } from './renderDAppHook';
import { connectContractToSigner } from '../hooks/useContractFunction';
import { setupTestingConfig } from './utils';
describe('connectContractToSigner', () => {
    let token;
    let config;
    let network1;
    beforeEach(async () => {
        ;
        ({ config, network1 } = await setupTestingConfig());
        token = new Contract(network1.deployer.address, ERC20Interface);
    });
    it('throws error without signer', () => {
        expect(() => connectContractToSigner(token)).to.throw('No signer available in contract, options or library');
    });
    it('noop if contract has signer', () => {
        const signer = network1.provider.getSigner();
        const connectedContract = token.connect(signer);
        expect(connectContractToSigner(connectedContract).signer).to.eq(signer);
    });
    it('takes signer from options', () => {
        const signer = network1.provider.getSigner();
        const connectedContract = connectContractToSigner(token, { signer });
        expect(connectedContract.signer).to.eq(signer);
    });
    it('takes signer from library', async () => {
        const { result, waitForCurrent } = await renderDAppHook(() => useEthers(), { config });
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.library) !== undefined);
        const { library } = result.current;
        const signer = library && 'getSigner' in library ? library.getSigner() : undefined;
        const connectedContract = connectContractToSigner(token, undefined, signer);
        expect(connectedContract.signer).to.be.deep.eq(signer);
    });
});
//# sourceMappingURL=connectContractToSigner.test.js.map