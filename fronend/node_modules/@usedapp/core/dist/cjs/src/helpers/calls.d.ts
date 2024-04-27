import { Call } from '../hooks/useCall';
import { Awaited, ContractMethodNames, Falsy, TypedContract } from '../model/types';
import { RawCall, RawCallResult } from '../providers';
import { QueryParams } from '../constants/type/QueryParams';
import { ChainId } from '../constants/chainId';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function warnOnInvalidCall(call: Call | Falsy): void;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function validateCall(call: Call): Call;
/**
 * @internal Intended for internal use - use it on your own risk
 * @returns
 * One of these:
 * - a RawCall, if encoding is successful.
 * - Falsy, if there is no call to encode.
 * - an Error, if encoding fails (e.g. because of mismatched arguments).
 */
export declare function encodeCallData(call: Call | Falsy, chainId: number, queryParams?: QueryParams): RawCall | Falsy | Error;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function getUniqueActiveCalls(requests: RawCall[]): RawCall[];
export interface RefreshOptions {
    blockNumber?: number;
    chainId?: ChainId;
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function getCallsForUpdate(requests: RawCall[], options?: RefreshOptions): RawCall[];
/**
 * Result of a {@link useCall} query.
 *
 * It is `undefined` when call didn't return yet or a object `{ value, error }` if it did.
 *
 * - `value:` `any[] | undefined` - array of results or undefined if error occurred,
 * - `error`: `Error | undefined` - encountered error or undefined if call was successful.
 *
 * @public
 */
export declare type CallResult<T extends TypedContract, MN extends ContractMethodNames<T>> = {
    value: Awaited<ReturnType<T['functions'][MN]> | undefined>;
    error: Error | undefined;
} | undefined;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function decodeCallResult<T extends TypedContract, MN extends ContractMethodNames<T>>(call: Call | Falsy, result: RawCallResult): CallResult<T, MN>;
//# sourceMappingURL=calls.d.ts.map