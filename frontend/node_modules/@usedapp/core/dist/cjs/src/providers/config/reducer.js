"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configReducer = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
function configReducer(state, action) {
    return (0, lodash_merge_1.default)({}, state, action);
}
exports.configReducer = configReducer;
//# sourceMappingURL=reducer.js.map