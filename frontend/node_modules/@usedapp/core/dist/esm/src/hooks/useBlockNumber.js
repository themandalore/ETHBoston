import { useEffect, useState } from 'react';
import { subscribeToNewBlock, useReadonlyNetworks, useWindow } from '../providers';
import { useConnector } from '../providers/network/connectors';
import { useChainId } from './useChainId';
import { useDebounce } from './useDebounce';
import { useIsMounted } from './useIsMounted';
/**
 * Get the current block number.
 * Will update automatically when the new block is mined.
 * @public
 */
export function useBlockNumber() {
    const chainId = useChainId();
    const readOnlyNetworks = useReadonlyNetworks();
    const { connector } = useConnector();
    const [blockNumber, setBlockNumber] = useState();
    const isActive = useWindow();
    const isMounted = useIsMounted();
    useEffect(() => {
        if (!isActive) {
            return;
        }
        const readOnlyNetwork = chainId && readOnlyNetworks[chainId];
        if (readOnlyNetwork) {
            const unsub = subscribeToNewBlock(readOnlyNetwork, chainId, ({ blockNumber }) => {
                if (isMounted()) {
                    setBlockNumber(blockNumber);
                }
            }, isActive);
            return () => unsub();
        }
        if (!connector) {
            return;
        }
        const unsub = connector.newBlock.on((blockNumber) => {
            if (isMounted()) {
                setBlockNumber(blockNumber);
            }
        });
        return () => unsub();
    }, [isActive, readOnlyNetworks, connector, chainId]);
    const debouncedBlockNumber = useDebounce(blockNumber, 100);
    return debouncedBlockNumber;
}
//# sourceMappingURL=useBlockNumber.js.map