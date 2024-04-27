export declare const toBytes: (str: string) => Uint8Array;
export declare const fromBytes: (bytes: Uint8Array) => string;
export declare const fromHexString: (hexString: string) => Uint8Array;
export declare const toHexString: (bytes: Uint8Array) => string;
export declare const toBase64: (bytes: Uint8Array) => string;
export declare const fromBase64: (str: string) => Uint8Array;
export declare const hexToU8Receiver: (_key: string, value: unknown) => unknown;
export declare const toJSON: (obj: unknown) => string;
export declare const fromJSON: (json: string) => any;
export declare const zip: <T, Z>(a: readonly T[], b: readonly Z[]) => readonly (readonly [a: T, b: Z])[];
export declare const toEpoch: (date: Date) => number;
export declare const objectEquals: (a: unknown, b: unknown, strict?: boolean) => boolean;
export declare const omit: (obj: Record<string, unknown>, keys: string[]) => {
    [x: string]: unknown;
};
