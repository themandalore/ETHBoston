"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const chai_1 = require("chai");
const testing_1 = require("../../src/testing");
const fetch_mock_1 = __importDefault(require("fetch-mock"));
describe('useTokenList', () => {
    it('returns token list', async () => {
        const { config, network1 } = await (0, testing_1.setupTestingConfig)();
        const tokens = {
            name: 'Uniswap Labs List',
            logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
            tokens: [
                {
                    chainId: network1.chainId,
                    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
                    name: 'Aave',
                    symbol: 'AAVE',
                    decimals: 18,
                    logoURI: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
                },
            ],
        };
        fetch_mock_1.default.mock('http://example.com', tokens);
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useTokenList)('http://example.com'), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.deep.eq(tokens);
    });
});
//# sourceMappingURL=useTokenList.test.js.map