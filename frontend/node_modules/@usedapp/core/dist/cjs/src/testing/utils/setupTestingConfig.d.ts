interface SetupTestingConfigOptions {
    multicallVersion: 1 | 2;
}
/**
 * Creates two networks of mock providers with multicalls,
 * and constructs a useDapp Config.
 * @internal
 */
export declare const setupTestingConfig: ({ multicallVersion }?: SetupTestingConfigOptions) => Promise<{
    config: {
        readOnlyChainId?: number | undefined;
        readOnlyUrls?: import("../../constants").NodeUrls | undefined;
        multicallAddresses?: import("../../constants").MulticallAddresses | undefined;
        multicallVersion?: 1 | 2 | undefined;
        fastMulticallEncoding?: boolean | undefined;
        noMetamaskDeactivate?: boolean | undefined;
        supportedChains?: number[] | undefined;
        networks?: import("../../constants").Chain[] | undefined;
        pollingInterval?: number | undefined;
        pollingIntervals?: import("../../constants").PollingIntervals | undefined;
        notifications?: {
            checkInterval?: number | undefined;
            expirationPeriod?: number | undefined;
        } | undefined;
        localStorage?: {
            transactionPath: string;
        } | undefined;
        gasLimitBufferPercentage?: number | undefined;
        bufferGasLimitPercentage?: number | undefined;
        autoConnect?: boolean | undefined;
        refresh?: number | "never" | "everyBlock" | undefined;
        localStorageOverride?: Storage | undefined;
        connectors?: {
            [key: string]: import("../..").Connector;
        } | undefined;
    };
    network1: import("./createMockProvider").CreateMockProviderResult;
    network2: import("./createMockProvider").CreateMockProviderResult;
}>;
export {};
//# sourceMappingURL=setupTestingConfig.d.ts.map