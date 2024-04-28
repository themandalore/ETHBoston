export class Event {
    constructor() {
        this._listeners = new Set();
        this._effects = new Set();
    }
    emit(data) {
        for (const listener of Array.from(this._listeners)) {
            void this._trigger(listener, data);
        }
    }
    on(callback) {
        this._listeners.add(callback);
        if (this.listenerCount() === 1) {
            this._runEffects();
        }
        return () => this.off(callback);
    }
    off(callback) {
        this._listeners.delete(callback);
        if (this.listenerCount() === 0) {
            this._cleanupEffects();
        }
    }
    listenerCount() {
        return this._listeners.size;
    }
    addEffect(effect) {
        const handle = { effect, cleanup: undefined };
        if (this.listenerCount() > 0) {
            const cleanup = handle.effect();
            if (typeof cleanup === 'function') {
                handle.cleanup = cleanup;
            }
        }
        this._effects.add(handle);
        return () => {
            var _a;
            // eslint-disable-next-line no-unused-expressions
            (_a = handle.cleanup) === null || _a === void 0 ? void 0 : _a.call(handle);
            this._effects.delete(handle);
        };
    }
    async _trigger(listener, data) {
        try {
            await waitImmediate(); // Acts like setImmediate but preserves the stack-trace.
            listener(data);
        }
        catch (error) {
            // Stop error propagation.
            throwUnhandledRejection(error);
        }
    }
    _runEffects() {
        for (const handle of Array.from(this._effects)) {
            const cleanup = handle.effect();
            if (typeof cleanup === 'function') {
                handle.cleanup = cleanup;
            }
        }
    }
    _cleanupEffects() {
        var _a;
        for (const handle of Array.from(this._effects)) {
            // eslint-disable-next-line no-unused-expressions
            (_a = handle.cleanup) === null || _a === void 0 ? void 0 : _a.call(handle);
            handle.cleanup = undefined;
        }
    }
}
function throwUnhandledRejection(error) {
    setTimeout(() => {
        throw error;
    });
}
/**
 * Like setImmediate but for async/await API. Useful for preserving stack-traces.
 */
const waitImmediate = () => new Promise((resolve) => setTimeout(resolve));
//# sourceMappingURL=event.js.map