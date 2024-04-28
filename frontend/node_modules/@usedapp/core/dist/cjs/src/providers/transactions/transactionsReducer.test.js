"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const reducer_1 = require("./reducer");
describe('transactionsReducer', () => {
    it('addTransaction', () => {
        const transaction = {
            transaction: { chainId: 1 },
            submittedAt: 10,
        };
        (0, chai_1.expect)((0, reducer_1.transactionReducer)({}, { type: 'ADD_TRANSACTION', payload: transaction })).to.deep.eq({
            1: [transaction],
        });
    });
    it('updateTransaction', () => {
        const transaction = {
            transaction: { chainId: 1 },
            submittedAt: 10,
        };
        const state = (0, reducer_1.transactionReducer)({}, { type: 'ADD_TRANSACTION', payload: transaction });
        (0, chai_1.expect)(state).to.deep.eq({
            1: [transaction],
        });
        const updatedTransaction = {
            ...transaction,
            receipt: { status: 1 },
        };
        (0, chai_1.expect)((0, reducer_1.transactionReducer)(state, { type: 'UPDATE_TRANSACTION', payload: updatedTransaction })).to.deep.eq({
            1: [updatedTransaction],
        });
    });
    it('correct order', () => {
        const initial = {
            transaction: { chainId: 1 },
            submittedAt: 10,
        };
        const added = {
            transaction: { chainId: 1 },
            submittedAt: 30,
        };
        const newState = (0, reducer_1.transactionReducer)({ 1: [initial] }, { type: 'ADD_TRANSACTION', payload: added });
        (0, chai_1.expect)(newState).to.deep.eq({ 1: [added, initial] });
    });
    it('update transactions', () => {
        const initialTransactions = [
            { transaction: { chainId: 1 }, submittedAt: 10 },
            { transaction: { chainId: 1 }, submittedAt: 15 },
            { transaction: { chainId: 1 }, submittedAt: 20 },
        ];
        const newTransactions = initialTransactions.map((tx) => ({ ...tx, lastCheckedBlockNumber: 12 }));
        const newState = (0, reducer_1.transactionReducer)({ 1: initialTransactions }, { type: 'UPDATE_TRANSACTIONS', chainId: 1, transactions: newTransactions });
        (0, chai_1.expect)(newState).to.deep.eq({ 1: newTransactions });
    });
});
//# sourceMappingURL=transactionsReducer.test.js.map