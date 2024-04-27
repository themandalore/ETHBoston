import { createContext, useContext } from 'react';
export const ReadonlyNetworksContext = createContext({
    providers: {},
    updateNetworkState: () => undefined,
    networkStates: {},
});
export function useReadonlyNetworks() {
    return useContext(ReadonlyNetworksContext).providers;
}
export function useUpdateNetworksState() {
    return useContext(ReadonlyNetworksContext).updateNetworkState;
}
export function useReadonlyNetworkStates() {
    return useContext(ReadonlyNetworksContext).networkStates;
}
//# sourceMappingURL=context.js.map