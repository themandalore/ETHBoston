"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chainExplorerLink_1 = require("./chainExplorerLink");
describe('Chain explorer links', () => {
    it('getAddressLink'),
        () => {
            (0, chai_1.expect)((0, chainExplorerLink_1.getAddressLink)('https://optimistic.etherscan.io')('0x0000000000000000000000000000000000000000')).to.eq('https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000');
        };
    it('getTransactionLink'),
        () => {
            (0, chai_1.expect)((0, chainExplorerLink_1.getTransactionLink)('https://optimistic.etherscan.io')('0xf0299d575e284a0457baba6107bbdbdfffffffffffffffff0000000000000000')).to.eq('https://optimistic.etherscan.io/tx/0xf0299d575e284a0457baba6107bbdbdfffffffffffffffff0000000000000000');
        };
});
//# sourceMappingURL=chainExplorerLink.test.js.map