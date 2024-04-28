"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const chai_1 = require("chai");
const useLocalStorage_1 = require("../../src/hooks/useLocalStorage");
describe('useLocalStorage', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });
    function render() {
        let key = 'foo';
        const result = (0, react_hooks_1.renderHook)(() => (0, useLocalStorage_1.useLocalStorage)(key));
        return {
            getValue: () => result.result.current[0],
            setValue: (value) => (0, react_hooks_1.act)(() => result.result.current[1](value)),
            setKey: (value) => {
                key = value;
                result.rerender();
            },
        };
    }
    it('returns undefined for empty storage', () => {
        const { getValue } = render();
        (0, chai_1.expect)(getValue()).to.equal(undefined);
    });
    it('parses existing values', () => {
        window.localStorage.setItem('foo', JSON.stringify({ a: 1 }));
        const { getValue } = render();
        (0, chai_1.expect)(getValue()).to.deep.equal({ a: 1 });
    });
    it('caches results', () => {
        window.localStorage.setItem('foo', JSON.stringify({ a: 1 }));
        const { getValue } = render();
        (0, chai_1.expect)(getValue()).to.deep.equal({ a: 1 });
        window.localStorage.setItem('foo', JSON.stringify({ a: 2 }));
        (0, chai_1.expect)(getValue()).to.deep.equal({ a: 1 });
    });
    it('returns undefined when cannot parse', () => {
        window.localStorage.setItem('foo', 'x{}y');
        const { getValue } = render();
        (0, chai_1.expect)(getValue()).to.equal(undefined);
    });
    it('modifies the localStorage and returns a the new value', () => {
        const { getValue, setValue } = render();
        (0, chai_1.expect)(getValue()).to.equal(undefined);
        setValue({ a: 1 });
        (0, chai_1.expect)(window.localStorage.getItem('foo')).to.equal('{"a":1}');
        (0, chai_1.expect)(getValue()).to.deep.equal({ a: 1 });
    });
    it('can remove the item by setting undefined', () => {
        window.localStorage.setItem('foo', 'true');
        const { getValue, setValue } = render();
        (0, chai_1.expect)(getValue()).to.equal(true);
        setValue(undefined);
        (0, chai_1.expect)(getValue()).to.equal(undefined);
        (0, chai_1.expect)(window.localStorage.getItem('foo')).to.equal(null);
    });
    it('can change keys', () => {
        window.localStorage.setItem('foo', 'true');
        const { getValue, setKey } = render();
        (0, chai_1.expect)(getValue()).to.equal(true);
        setKey('bar');
        (0, chai_1.expect)(getValue()).to.equal(undefined);
        (0, chai_1.expect)(window.localStorage.getItem('foo')).to.equal('true');
        (0, chai_1.expect)(window.localStorage.getItem('bar')).to.equal(null);
    });
    it('can change keys and modify the other value', () => {
        window.localStorage.setItem('foo', 'true');
        window.localStorage.setItem('bar', 'false');
        const { getValue, setValue, setKey } = render();
        (0, chai_1.expect)(getValue()).to.equal(true);
        setValue(123);
        setKey('bar');
        (0, chai_1.expect)(getValue()).to.equal(false);
        setValue(456);
        (0, chai_1.expect)(window.localStorage.getItem('foo')).to.equal('123');
        (0, chai_1.expect)(window.localStorage.getItem('bar')).to.equal('456');
    });
});
//# sourceMappingURL=useLocalStorage.test.js.map