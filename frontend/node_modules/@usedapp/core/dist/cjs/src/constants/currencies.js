"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE_CURRENCY = exports.TestBUSD = exports.TestBNB = exports.BUSD = exports.BNB = exports.KovanDai = exports.KovanEther = exports.Dai = exports.Ether = void 0;
const model_1 = require("../model");
const ethereum_1 = require("../model/chain/ethereum");
const bsc_1 = require("../model/chain/bsc");
exports.Ether = new model_1.NativeCurrency('Ether', 'ETH', ethereum_1.Mainnet.chainId);
exports.Dai = new model_1.Token('Dai', 'DAI', ethereum_1.Mainnet.chainId, '0x6B175474E89094C44Da98b954EedeAC495271d0F');
exports.KovanEther = new model_1.NativeCurrency('Kovan Ether', 'KETH', ethereum_1.Kovan.chainId);
exports.KovanDai = new model_1.Token('Dai', 'DAI', ethereum_1.Kovan.chainId, '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa');
exports.BNB = new model_1.NativeCurrency('Binance Coin', 'BNB', bsc_1.BSC.chainId);
exports.BUSD = new model_1.Token('Binance USD', 'BUSD', bsc_1.BSC.chainId, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
exports.TestBNB = new model_1.NativeCurrency('Test Binance Coin', 'TBNB', bsc_1.BSCTestnet.chainId);
exports.TestBUSD = new model_1.Token('Test Binance USD', 'TBUSD', bsc_1.BSCTestnet.chainId, '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47');
exports.NATIVE_CURRENCY = {
    [ethereum_1.Mainnet.chainId]: exports.Ether,
    [ethereum_1.Kovan.chainId]: exports.KovanEther,
    [bsc_1.BSC.chainId]: exports.BNB,
    [bsc_1.BSCTestnet.chainId]: exports.TestBNB,
};
//# sourceMappingURL=currencies.js.map