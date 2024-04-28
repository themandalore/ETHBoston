interface LookupAddressOptions {
    rave?: boolean;
}
/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) or Rave Names (e.g. `name.ftm`) for a specific address.
 * @param address address to lookup
 * @param options additional options
 * @returns {} Object with the following:
  - `ens: string | null | undefined` - ENS or Rave name of the account or null if not found.
  - `isLoading: boolean` - indicates whether the lookup is in progress.
  - `error: Error | null` - error that occurred during the lookup or null if no error occurred.
 * @public
 * @example
 * const { account } = useEthers()
 * const { ens } = useLookupAddress(account)
 *
 * return (
 *   <p>Account: {ens ?? account}</p>
 * )
 */
export declare function useLookupAddress(address: string | undefined, { rave }?: LookupAddressOptions): {
    ens: string | null | undefined;
    isLoading: boolean;
    error: Error | null;
};
export {};
//# sourceMappingURL=useLookupAddress.d.ts.map