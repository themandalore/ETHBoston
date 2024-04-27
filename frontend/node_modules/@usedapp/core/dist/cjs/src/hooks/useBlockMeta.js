"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlockMeta = void 0;
const constants_1 = require("../constants");
const ethers_1 = require("ethers");
const useMulticallAddress_1 = require("./useMulticallAddress");
const useRawCalls_1 = require("./useRawCalls");
const useChainId_1 = require("./useChainId");
const useConfig_1 = require("./useConfig");
const useBlockNumbers_1 = require("./useBlockNumbers");
const react_1 = require("react");
const GET_CURRENT_BLOCK_TIMESTAMP_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', []);
const GET_CURRENT_BLOCK_DIFFICULTY_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', []);
/**
 * Queries block metadata.
 * @public
 */
function useBlockMeta(queryParams = {}) {
    var _a, _b;
    const chainId = (0, useChainId_1.useChainId)({ queryParams });
    const { refresh: configRefresh } = (0, useConfig_1.useConfig)();
    const blockNumbers = (0, useBlockNumbers_1.useBlockNumbers)();
    const address = (0, useMulticallAddress_1.useMulticallAddress)(queryParams);
    const refresh = (_a = queryParams.refresh) !== null && _a !== void 0 ? _a : configRefresh;
    const isStatic = (_b = queryParams.isStatic) !== null && _b !== void 0 ? _b : refresh === 'never';
    const refreshPerBlocks = typeof refresh === 'number' ? refresh : undefined;
    const timestampResult = (0, useRawCalls_1.useRawCall)(address &&
        chainId !== undefined && {
        address,
        data: GET_CURRENT_BLOCK_TIMESTAMP_CALL,
        chainId,
        isStatic,
        refreshPerBlocks,
    });
    const difficulty = (0, useRawCalls_1.useRawCall)(address &&
        chainId !== undefined && {
        address,
        data: GET_CURRENT_BLOCK_DIFFICULTY_CALL,
        chainId,
        isStatic,
        refreshPerBlocks,
    });
    const timestamp = (0, react_1.useMemo)(() => {
        try {
            return timestampResult !== undefined
                ? new Date(ethers_1.BigNumber.from(timestampResult.value).mul(1000).toNumber())
                : undefined;
        }
        catch (e) {
            console.warn('Failed to parse timestamp of a block', e);
        }
    }, [timestampResult]);
    return {
        timestamp,
        difficulty: difficulty !== undefined ? ethers_1.BigNumber.from(difficulty.value) : undefined,
        blockNumber: chainId ? blockNumbers[chainId] : undefined,
    };
}
exports.useBlockMeta = useBlockMeta;
//# sourceMappingURL=useBlockMeta.js.map