"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const chai_1 = require("chai");
const useAdder_1 = require("./useAdder");
const testing_1 = require("../../src/testing");
describe('useAdder', () => {
    it('properly renders without arguments or context wrapper', async () => {
        const { result } = await (0, testing_1.renderDAppHook)(useAdder_1.useAdder);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.sum).to.be.equal(0);
    });
    it('properly renders with arguments', async () => {
        const { result: firstExample } = await (0, testing_1.renderDAppHook)(() => (0, useAdder_1.useAdder)(1, 1));
        const { result: secondExample } = await (0, testing_1.renderDAppHook)(({ arg1, arg2 }) => (0, useAdder_1.useAdder)(arg1, arg2), {
            renderHook: { initialProps: { arg1: 1, arg2: 1 } },
        });
        (0, chai_1.expect)(firstExample.current.sum).to.be.equal(2);
        (0, chai_1.expect)(secondExample.current.sum).to.be.equal(2);
    });
    it('properly renders with changing arguments', async () => {
        const { result, rerender } = await (0, testing_1.renderDAppHook)(({ arg1, arg2 }) => (0, useAdder_1.useAdder)(arg1, arg2), {
            renderHook: { initialProps: { arg1: 1, arg2: 1 } },
        });
        (0, chai_1.expect)(result.current.sum).to.be.equal(2);
        rerender({ arg1: 2, arg2: 3 });
        (0, chai_1.expect)(result.current.sum).to.be.equal(5);
    });
    it('properly renders with context wrapper', async () => {
        const { result: firstExample } = await (0, testing_1.renderDAppHook)(useAdder_1.useAdder, {
            renderHook: {
                wrapper: ({ children }) => (0, jsx_runtime_1.jsx)(useAdder_1.AdderProvider, { value: { prov1: 2, prov2: 2 }, children: children }),
            },
        });
        const { result: secondExample } = await (0, testing_1.renderDAppHook)(() => (0, useAdder_1.useAdder)(), {
            renderHook: {
                wrapper: ({ children, prov1, prov2 }) => (0, jsx_runtime_1.jsx)(useAdder_1.AdderProvider, { value: { prov1, prov2 }, children: children }),
                initialProps: { prov1: 2, prov2: 2 },
            },
        });
        (0, chai_1.expect)(firstExample.current.sum).to.be.equal(4);
        (0, chai_1.expect)(secondExample.current.sum).to.be.equal(4);
    });
    it('properly renders with context wrapper changing props', async () => {
        const { result, rerender } = await (0, testing_1.renderDAppHook)(() => (0, useAdder_1.useAdder)(), {
            renderHook: {
                wrapper: ({ children, prov1, prov2 }) => (0, jsx_runtime_1.jsx)(useAdder_1.AdderProvider, { value: { prov1, prov2 }, children: children }),
                initialProps: { prov1: 2, prov2: 2 },
            },
        });
        (0, chai_1.expect)(result.current.sum).to.be.equal(4);
        rerender({ prov1: 3, prov2: 3 });
        (0, chai_1.expect)(result.current.sum).to.be.equal(6);
    });
    it('properly renders with arguments and context wrapper', async () => {
        const { result } = await (0, testing_1.renderDAppHook)(({ arg1, arg2 }) => (0, useAdder_1.useAdder)(arg1, arg2), {
            renderHook: {
                wrapper: ({ children, prov1, prov2 }) => (0, jsx_runtime_1.jsx)(useAdder_1.AdderProvider, { value: { prov1, prov2 }, children: children }),
                initialProps: { arg1: 1, arg2: 1, prov1: 2, prov2: 2 },
            },
        });
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.sum).to.be.equal(6);
    });
    it('properly renders with changing arguments and context wrapper changing props', async () => {
        const { result, rerender } = await (0, testing_1.renderDAppHook)(({ arg1, arg2 }) => (0, useAdder_1.useAdder)(arg1, arg2), {
            renderHook: {
                wrapper: ({ children, prov1, prov2 }) => (0, jsx_runtime_1.jsx)(useAdder_1.AdderProvider, { value: { prov1, prov2 }, children: children }),
                initialProps: { arg1: 1, arg2: 1, prov1: 2, prov2: 2 },
            },
        });
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.sum).to.be.equal(6);
        rerender({ arg1: 2, arg2: 2, prov1: 3, prov2: 3 });
        (0, chai_1.expect)(result.current.sum).to.be.equal(10);
    });
});
//# sourceMappingURL=useAdder.test.js.map