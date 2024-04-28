"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const __1 = require("../../..");
const chainStateReducer_1 = require("./chainStateReducer");
describe('chainStateReducer', () => {
    const ADDRESS_A = '0x' + 'a'.repeat(40);
    const ADDRESS_B = '0x' + 'b'.repeat(40);
    const ADDRESS_C = '0x' + 'c'.repeat(40);
    it('ignores updates from older blocks', () => {
        const state = {
            [__1.Mainnet.chainId]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': {
                            value: '0xbeef',
                            success: true,
                        },
                    },
                },
            },
        };
        const result = (0, chainStateReducer_1.chainStateReducer)(state, {
            type: 'FETCH_SUCCESS',
            chainId: __1.Mainnet.chainId,
            blockNumber: 1233,
            state: {
                [ADDRESS_A]: {
                    '0xdead': {
                        value: '0x0001',
                        success: true,
                    },
                },
            },
        });
        (0, chai_1.expect)(result).to.deep.equal(state);
    });
    it('merges with updates from newer blocks', () => {
        const state = {
            [__1.Mainnet.chainId]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': {
                            value: '0xbeef',
                            success: true,
                        },
                    },
                },
            },
        };
        const result = (0, chainStateReducer_1.chainStateReducer)(state, {
            type: 'FETCH_SUCCESS',
            chainId: __1.Mainnet.chainId,
            blockNumber: 1235,
            state: {
                [ADDRESS_B]: {
                    '0xabcd': {
                        value: '0x5678',
                        success: false,
                    },
                },
            },
        });
        const expected = {
            [__1.Mainnet.chainId]: {
                blockNumber: 1235,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': {
                            value: '0xbeef',
                            success: true,
                        },
                    },
                    [ADDRESS_B]: {
                        '0xabcd': {
                            value: '0x5678',
                            success: false,
                        },
                    },
                },
            },
        };
        (0, chai_1.expect)(result).to.deep.equal(expected);
    });
    it('merges updates from same block', () => {
        // This behavior is needed to handle requests resolving out of order.
        // Imagine the following calls are made:
        //   a.foo()
        //   b.bar()
        // Then the user navigates to a different page and other calls are:
        //   c.baz()
        // This results in two multicall requests being made. Now imagine that
        // they resolve out of order. Data for c.baz() then would be overwritten and
        // the user would need to wait for the next block to see their data.
        // To prevent this we merge the state for updates from the same block.
        const state = {
            [__1.Mainnet.chainId]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': {
                            value: '0xbeef',
                            success: true,
                        },
                    },
                    [ADDRESS_C]: {
                        '0xcc': {
                            value: '0xdd',
                            success: false,
                        },
                    },
                },
            },
        };
        const result = (0, chainStateReducer_1.chainStateReducer)(state, {
            type: 'FETCH_SUCCESS',
            chainId: __1.Mainnet.chainId,
            blockNumber: 1234,
            state: {
                [ADDRESS_A]: {
                    '0xabcd': {
                        value: '0x30',
                        success: false,
                    },
                },
                [ADDRESS_B]: {
                    '0xabcd': {
                        value: '0x5678',
                        success: true,
                    },
                },
            },
        });
        const expected = {
            [__1.Mainnet.chainId]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': {
                            value: '0xbeef',
                            success: true,
                        },
                        '0xabcd': {
                            value: '0x30',
                            success: false,
                        },
                    },
                    [ADDRESS_B]: {
                        '0xabcd': {
                            value: '0x5678',
                            success: true,
                        },
                    },
                    [ADDRESS_C]: {
                        '0xcc': {
                            value: '0xdd',
                            success: false,
                        },
                    },
                },
            },
        };
        (0, chai_1.expect)(result).to.deep.equal(expected);
    });
});
//# sourceMappingURL=chainStateReducer.test.js.map