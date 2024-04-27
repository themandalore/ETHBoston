"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReadonlyNetworkStates = exports.useUpdateNetworksState = exports.useReadonlyNetworks = exports.ReadonlyNetworksContext = void 0;
const react_1 = require("react");
exports.ReadonlyNetworksContext = (0, react_1.createContext)({
    providers: {},
    updateNetworkState: () => undefined,
    networkStates: {},
});
function useReadonlyNetworks() {
    return (0, react_1.useContext)(exports.ReadonlyNetworksContext).providers;
}
exports.useReadonlyNetworks = useReadonlyNetworks;
function useUpdateNetworksState() {
    return (0, react_1.useContext)(exports.ReadonlyNetworksContext).updateNetworkState;
}
exports.useUpdateNetworksState = useUpdateNetworksState;
function useReadonlyNetworkStates() {
    return (0, react_1.useContext)(exports.ReadonlyNetworksContext).networkStates;
}
exports.useReadonlyNetworkStates = useReadonlyNetworkStates;
//# sourceMappingURL=context.js.map