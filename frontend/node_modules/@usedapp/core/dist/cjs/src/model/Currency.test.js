"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const __1 = require("..");
const AddressZero = ethers_1.constants.AddressZero;
describe('Currency', () => {
    it('can be constructed', () => {
        const zuckBucks = new __1.Currency('Zuck Bucks', 'ZB', 2, {
            suffix: 'ZB',
        });
        const formatted = zuckBucks.format('1234');
        (0, chai_1.expect)(formatted).to.equal('12.34ZB');
    });
    it('FiatCurrency', () => {
        const dollar = new __1.FiatCurrency('United States Dollar', 'USD', 2, {
            prefix: '$',
            suffix: ' USD',
        });
        const formatted = dollar.format('1234');
        (0, chai_1.expect)(formatted).to.equal('$12.34 USD');
    });
    it('NativeCurrency', () => {
        const ether = new __1.NativeCurrency('Ether', 'ETH', __1.Mainnet.chainId);
        const formatted = ether.format('123'.concat('0'.repeat(18)));
        (0, chai_1.expect)(formatted).to.equal('123 ETH');
    });
    it('Token', () => {
        const token = new __1.Token('Fake Dai', 'FDI', __1.Mainnet.chainId, AddressZero);
        const formatted = token.format('123'.concat('0'.repeat(18)));
        (0, chai_1.expect)(formatted).to.equal('123 FDI');
    });
});
//# sourceMappingURL=Currency.test.js.map