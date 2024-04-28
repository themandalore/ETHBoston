"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useChainMeta_1 = require("../../src/hooks/useChainMeta");
const react_hooks_1 = require("@testing-library/react-hooks");
const src_1 = require("../../src");
const chai_1 = require("chai");
describe('useChainMeta', () => {
    it('works for Mainnet', async () => {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useChainMeta_1.useChainMeta)(src_1.Mainnet.chainId));
        (0, chai_1.expect)(result.current).to.deep.equal(src_1.Mainnet);
    });
    it('works for Arbitrum', async () => {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useChainMeta_1.useChainMeta)(src_1.Arbitrum.chainId));
        (0, chai_1.expect)(result.current).to.deep.equal(src_1.Arbitrum);
    });
});
//# sourceMappingURL=useChainMeta.test.js.map