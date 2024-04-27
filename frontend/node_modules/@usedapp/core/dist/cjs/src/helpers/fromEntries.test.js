"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fromEntries_1 = require("../../src/helpers/fromEntries");
describe('fromEntries', () => {
    it('correctly wraps Object.fromEntries', async () => {
        (0, chai_1.expect)((0, fromEntries_1.fromEntries)([
            ['a', 1],
            ['b', 2],
        ])).to.deep.equal({ a: 1, b: 2 });
    });
});
//# sourceMappingURL=fromEntries.test.js.map