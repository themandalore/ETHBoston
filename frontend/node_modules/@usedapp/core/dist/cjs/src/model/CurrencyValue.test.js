"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../src");
const CurrencyValue_1 = require("../../src/model/CurrencyValue");
const dollar = new src_1.FiatCurrency('Dollar', 'USD', 2, { prefix: '$' });
const euro = new src_1.FiatCurrency('Euro', 'EUR');
describe('CurrencyValue', () => {
    it('can be constructed', () => {
        const value = CurrencyValue_1.CurrencyValue.fromString(dollar, '2137');
        (0, chai_1.expect)(value.toString()).to.equal('2137');
    });
    it('zero', () => {
        const value = CurrencyValue_1.CurrencyValue.zero(dollar);
        (0, chai_1.expect)(value.toString()).to.equal('0');
    });
    it('format', () => {
        const value = CurrencyValue_1.CurrencyValue.fromString(dollar, '420691337');
        (0, chai_1.expect)(value.format()).to.equal('$4,206,913.37');
    });
    it('map', () => {
        const value = CurrencyValue_1.CurrencyValue.fromString(dollar, '123');
        const mapped = value.map((x) => x.add(1));
        (0, chai_1.expect)(mapped.toString()).to.equal('124');
    });
    it('add', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const e = CurrencyValue_1.CurrencyValue.zero(euro);
        (0, chai_1.expect)(() => a.add(e)).to.throw(TypeError);
        const c = a.add(b);
        (0, chai_1.expect)(c.toString()).to.equal('489');
    });
    it('sub', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const e = CurrencyValue_1.CurrencyValue.zero(euro);
        (0, chai_1.expect)(() => a.sub(e)).to.throw(TypeError);
        const c = a.sub(b);
        (0, chai_1.expect)(c.toString()).to.equal('351');
    });
    it('mul', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        (0, chai_1.expect)(a.mul(69).toString()).to.equal('28980');
    });
    it('div', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        (0, chai_1.expect)(a.div(69).toString()).to.equal('6');
    });
    it('mod', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        (0, chai_1.expect)(a.mod(69).toString()).to.equal('6');
    });
    it('equals', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const d = CurrencyValue_1.CurrencyValue.fromString(euro, '69');
        (0, chai_1.expect)(a.equals(b)).to.be.true;
        (0, chai_1.expect)(b.equals(a)).to.be.true;
        (0, chai_1.expect)(a.equals(c)).to.be.false;
        (0, chai_1.expect)(a.equals(d)).to.be.false;
    });
    it('lt', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const e = CurrencyValue_1.CurrencyValue.zero(euro);
        (0, chai_1.expect)(() => a.lt(e)).to.throw(TypeError);
        (0, chai_1.expect)(a.lt(b)).to.be.false;
        (0, chai_1.expect)(b.lt(a)).to.be.false;
        (0, chai_1.expect)(a.lt(c)).to.be.false;
        (0, chai_1.expect)(c.lt(a)).to.be.true;
    });
    it('lte', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const e = CurrencyValue_1.CurrencyValue.zero(euro);
        (0, chai_1.expect)(() => a.lte(e)).to.throw(TypeError);
        (0, chai_1.expect)(a.lte(b)).to.be.true;
        (0, chai_1.expect)(b.lte(a)).to.be.true;
        (0, chai_1.expect)(a.lte(c)).to.be.false;
        (0, chai_1.expect)(c.lte(a)).to.be.true;
    });
    it('gt', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const e = CurrencyValue_1.CurrencyValue.zero(euro);
        (0, chai_1.expect)(() => a.gt(e)).to.throw(TypeError);
        (0, chai_1.expect)(a.gt(b)).to.be.false;
        (0, chai_1.expect)(b.gt(a)).to.be.false;
        (0, chai_1.expect)(a.gt(c)).to.be.true;
        (0, chai_1.expect)(c.gt(a)).to.be.false;
    });
    it('gte', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        const e = CurrencyValue_1.CurrencyValue.zero(euro);
        (0, chai_1.expect)(() => a.gte(e)).to.throw(TypeError);
        (0, chai_1.expect)(a.gte(b)).to.be.true;
        (0, chai_1.expect)(b.gte(a)).to.be.true;
        (0, chai_1.expect)(a.gte(c)).to.be.true;
        (0, chai_1.expect)(c.gte(a)).to.be.false;
    });
    it('isZero', () => {
        const a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        const b = CurrencyValue_1.CurrencyValue.fromString(dollar, '0');
        (0, chai_1.expect)(a.isZero()).to.be.false;
        (0, chai_1.expect)(b.isZero()).to.be.true;
    });
});
//# sourceMappingURL=CurrencyValue.test.js.map