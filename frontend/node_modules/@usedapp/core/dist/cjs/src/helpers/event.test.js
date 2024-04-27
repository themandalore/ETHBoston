"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const wait_for_expect_1 = __importDefault(require("wait-for-expect"));
const testing_1 = require("../testing");
const event_1 = require("./event");
describe('Event', () => {
    it('Triggers event', async () => {
        const event = new event_1.Event();
        const numbers = [];
        event.on((val) => {
            numbers.push(val);
        });
        event.emit(1);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1]);
        });
        event.emit(2);
        event.emit(3);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1, 2, 3]);
        });
    });
    it('Triggers event asynchnously', async () => {
        const event = new event_1.Event();
        const numbers = [];
        event.on((val) => {
            numbers.push(val);
        });
        event.emit(1);
        (0, chai_1.expect)(numbers).to.deep.equal([]);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1]);
        });
    });
    it('Removes event using returned function', async () => {
        const event = new event_1.Event();
        const numbers = [];
        const unsub = event.on((val) => {
            numbers.push(val);
        });
        event.emit(1);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1]);
        });
        unsub();
        event.emit(2);
        await (0, testing_1.sleep)(100);
        (0, chai_1.expect)(numbers).to.deep.equal([1]);
    });
    it('Removes event using off method', async () => {
        const event = new event_1.Event();
        const numbers = [];
        const listener = (val) => {
            numbers.push(val);
        };
        event.on(listener);
        event.emit(1);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1]);
        });
        event.off(listener);
        event.emit(2);
        await (0, testing_1.sleep)(100);
        (0, chai_1.expect)(numbers).to.deep.equal([1]);
    });
    it('Triggers multiple events and can remove them', async () => {
        const event = new event_1.Event();
        const numbers = [];
        const unsub1 = event.on((val) => {
            numbers.push(val);
        });
        const unsub2 = event.on((val) => {
            numbers.push(val);
        });
        event.emit(1);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1, 1]);
        });
        unsub1();
        event.emit(2);
        await (0, wait_for_expect_1.default)(() => {
            (0, chai_1.expect)(numbers).to.deep.equal([1, 1, 2]);
        });
        unsub2();
        event.emit(3);
        await (0, testing_1.sleep)(100);
        (0, chai_1.expect)(numbers).to.deep.equal([1, 1, 2]);
    });
    it('Triggers effects', async () => {
        const event = new event_1.Event();
        let num = 0;
        const removeEffect = event.addEffect(() => {
            num += 1;
        });
        //eslint-disable-next-line @typescript-eslint/no-empty-function
        event.on(() => { });
        (0, chai_1.expect)(num).to.eq(1);
        //eslint-disable-next-line @typescript-eslint/no-empty-function
        event.on(() => { });
        (0, chai_1.expect)(num).to.eq(1);
        removeEffect();
        //eslint-disable-next-line @typescript-eslint/no-empty-function
        event.on(() => { });
        (0, chai_1.expect)(num).to.eq(1);
        event.addEffect(() => {
            num += 2;
        });
        (0, chai_1.expect)(num).to.eq(3);
    });
});
//# sourceMappingURL=event.test.js.map