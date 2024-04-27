import { ChainId } from '../../../constants';
import type { providers } from 'ethers';
export interface NetworkState {
    errors: Error[];
}
export declare type Providers = {
    [chainId in ChainId]?: providers.BaseProvider;
};
export declare type NetworkStates = {
    [chainId in ChainId]?: NetworkState;
};
export interface ReadonlyNetworksModel {
    providers: Providers;
    updateNetworkState: (payload: Actions) => void;
    networkStates: NetworkStates;
}
export interface PropagateChainError {
    type: 'ADD_ERROR';
    chainId: ChainId;
    error: Error;
}
export declare type Actions = PropagateChainError;
//# sourceMappingURL=model.d.ts.map