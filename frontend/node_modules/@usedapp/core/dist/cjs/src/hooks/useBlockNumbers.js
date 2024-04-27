"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlockNumbers = void 0;
const react_1 = require("react");
const providers_1 = require("../providers");
/**
 * Get the current block numbers of all observed chains.
 * Will update automatically when new blocks are mined.
 * @internal Intended for internal use - use it on your own risk
 */
function useBlockNumbers() {
    return (0, react_1.useContext)(providers_1.BlockNumbersContext);
}
exports.useBlockNumbers = useBlockNumbers;
//# sourceMappingURL=useBlockNumbers.js.map