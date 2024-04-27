"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmptyTx = void 0;
const ethers_1 = require("ethers");
async function sendEmptyTx(wallet) {
    return wallet.sendTransaction({ to: ethers_1.constants.AddressZero });
}
exports.sendEmptyTx = sendEmptyTx;
//# sourceMappingURL=sendEmptyTx.js.map