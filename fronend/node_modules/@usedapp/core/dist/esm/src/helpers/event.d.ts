export declare type Effect = () => (() => void) | undefined | void;
export interface ReadOnlyEvent<T> {
    on: (cb: (data: T) => void) => () => void;
    off: (cb: (data: T) => void) => void;
    emit: (data: T) => void;
    addEffect: (effect: Effect) => () => void;
}
export declare class Event<T = void> implements ReadOnlyEvent<T> {
    private readonly _listeners;
    private readonly _effects;
    emit(data: T): void;
    on(callback: (data: T) => void): () => void;
    off(callback: (data: T) => void): void;
    listenerCount(): number;
    addEffect(effect: Effect): () => void;
    private _trigger;
    private _runEffects;
    private _cleanupEffects;
}
//# sourceMappingURL=event.d.ts.map