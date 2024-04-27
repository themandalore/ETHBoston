"use strict";
/*
An example hook that:
- can take optional arguments
- Optionally uses a context with a provider wrapper
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdder = exports.AdderProvider = void 0;
const react_1 = require("react");
const AdderContext = (0, react_1.createContext)(undefined);
exports.AdderProvider = AdderContext.Provider;
const useAdder = (arg1, arg2) => {
    var _a, _b;
    const context = (0, react_1.useContext)(AdderContext);
    return {
        sum: (arg1 !== null && arg1 !== void 0 ? arg1 : 0) + (arg2 !== null && arg2 !== void 0 ? arg2 : 0) + ((_a = context === null || context === void 0 ? void 0 : context.prov1) !== null && _a !== void 0 ? _a : 0) + ((_b = context === null || context === void 0 ? void 0 : context.prov2) !== null && _b !== void 0 ? _b : 0),
    };
};
exports.useAdder = useAdder;
//# sourceMappingURL=useAdder.js.map