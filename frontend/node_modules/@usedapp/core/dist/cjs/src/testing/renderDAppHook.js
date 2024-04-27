"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDAppHook = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hooks_1 = require("@testing-library/react-hooks");
const providers_1 = require("../providers");
const utils_1 = require("./utils");
/**
 * Next version of {@link renderWeb3Hook}.
 *
 * @internal
 * Internal until it's ready and stable.
 *
 * Differences from {@link renderWeb3Hook}:
 * The rendering happens at much higher level, closer to reality.
 * It takes a Config object and renders the hook under test in a `DAppProvider`,
 * which mimicks the real useDApp usage.
 *
 * @param hook Hook under test
 * @param options Optional options, same as in `renderHook`
 * @returns Same as in `renderHook`, with additions of helper functions.
 */
const renderDAppHook = async (hook, options) => {
    var _a, _b, _c;
    const UserWrapper = (_b = (_a = options === null || options === void 0 ? void 0 : options.renderHook) === null || _a === void 0 ? void 0 : _a.wrapper) !== null && _b !== void 0 ? _b : utils_1.IdentityWrapper;
    const { result, waitForNextUpdate, rerender, unmount } = (0, react_hooks_1.renderHook)(hook, {
        wrapper: (wrapperProps) => {
            var _a;
            return ((0, jsx_runtime_1.jsx)(providers_1.DAppProvider, { config: (_a = options === null || options === void 0 ? void 0 : options.config) !== null && _a !== void 0 ? _a : {}, children: (0, jsx_runtime_1.jsx)(UserWrapper, { ...wrapperProps }) }));
        },
        initialProps: (_c = options === null || options === void 0 ? void 0 : options.renderHook) === null || _c === void 0 ? void 0 : _c.initialProps,
    });
    return {
        result,
        rerender,
        unmount,
        // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
        waitForNextUpdate,
        ...(0, utils_1.getWaitUtils)(result),
    };
};
exports.renderDAppHook = renderDAppHook;
//# sourceMappingURL=renderDAppHook.js.map