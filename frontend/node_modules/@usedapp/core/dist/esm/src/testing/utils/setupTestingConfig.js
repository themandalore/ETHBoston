import { Mainnet } from '../../model';
import { MetamaskConnector } from '../../providers/network/connectors/implementations';
import { createMockProvider } from './createMockProvider';
import { SECOND_TEST_CHAIN_ID } from './deployMockToken';
/**
 * Creates two networks of mock providers with multicalls,
 * and constructs a useDapp Config.
 * @internal
 */
export const setupTestingConfig = async ({ multicallVersion } = { multicallVersion: 1 }) => {
    const network1 = await createMockProvider({ chainId: Mainnet.chainId, multicallVersion });
    const network2 = await createMockProvider({ chainId: SECOND_TEST_CHAIN_ID, multicallVersion });
    const config = {
        readOnlyChainId: Mainnet.chainId,
        readOnlyUrls: {
            [Mainnet.chainId]: network1.provider,
            [SECOND_TEST_CHAIN_ID]: network2.provider,
        },
        multicallAddresses: Object.assign(Object.assign({}, network1.multicallAddresses), network2.multicallAddresses),
        multicallVersion,
        pollingInterval: 100,
        connectors: {
            metamask: new MetamaskConnector(),
        },
    };
    return {
        config,
        network1,
        network2,
    };
};
//# sourceMappingURL=setupTestingConfig.js.map