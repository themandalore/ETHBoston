"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToNewBlock = void 0;
function subscribeToNewBlock(provider, chainId, dispatch, isActive) {
    if (provider && chainId !== undefined && isActive) {
        const update = (blockNumber) => dispatch({ chainId, blockNumber });
        provider.on('block', update);
        provider.getBlockNumber().then((blockNumber) => update(blockNumber), (err) => {
            console.error(err);
        });
        return () => {
            provider.off('block', update);
        };
    }
    return () => undefined;
}
exports.subscribeToNewBlock = subscribeToNewBlock;
//# sourceMappingURL=subscribeToNewBlock.js.map