import { ChainId } from '../../..';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare type Action = AddCall | RemoveCall | UpdateCall;
/**
 * Represents a single call on the blockchain that can be included in multicall.
 *
 * @public
 */
export interface RawCall {
    /**
     * address of a contract to call
     */
    address: string;
    /**
     * calldata of the call that encodes function call
     */
    data: string;
    /**
     * chain id of the chain to perform the call on
     */
    chainId: ChainId;
    /**
     * Whether the call is static (not expected to change between calls). Used for optimizations.
     */
    isStatic?: boolean;
    /**
     * number of last updated block
     */
    lastUpdatedBlockNumber?: number;
    /**
     * number of blocks to wait before updating the call
     */
    refreshPerBlocks?: number;
}
/**
 * @deprecated It's recommended to use RawCall instead
 * @internal Intended for internal use - use it on your own risk
 */
export interface ChainCall {
    chainId?: ChainId;
    address: string;
    data: string;
}
interface AddCall {
    type: 'ADD_CALLS';
    calls: RawCall[];
}
interface UpdateCall {
    type: 'UPDATE_CALLS';
    calls: RawCall[];
    updatedCalls: RawCall[];
    blockNumber: number;
    chainId: number;
}
interface RemoveCall {
    type: 'REMOVE_CALLS';
    calls: RawCall[];
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function callsReducer(state: RawCall[] | undefined, action: Action): RawCall[];
export {};
//# sourceMappingURL=callsReducer.d.ts.map