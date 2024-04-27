import { InitInput } from "./pkg/nucypher_core_wasm.js";
export * from "./pkg/nucypher_core_wasm.js";
export declare const setWasmInit: (arg: () => InitInput) => void;
export declare const initialize: (wasm?: InitInput) => Promise<void>;
