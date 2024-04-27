"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestingConfig = void 0;
const model_1 = require("../../model");
const implementations_1 = require("../../providers/network/connectors/implementations");
const createMockProvider_1 = require("./createMockProvider");
const deployMockToken_1 = require("./deployMockToken");
/**
 * Creates two networks of mock providers with multicalls,
 * and constructs a useDapp Config.
 * @internal
 */
const setupTestingConfig = async ({ multicallVersion } = { multicallVersion: 1 }) => {
    const network1 = await (0, createMockProvider_1.createMockProvider)({ chainId: model_1.Mainnet.chainId, multicallVersion });
    const network2 = await (0, createMockProvider_1.createMockProvider)({ chainId: deployMockToken_1.SECOND_TEST_CHAIN_ID, multicallVersion });
    const config = {
        readOnlyChainId: model_1.Mainnet.chainId,
        readOnlyUrls: {
            [model_1.Mainnet.chainId]: network1.provider,
            [deployMockToken_1.SECOND_TEST_CHAIN_ID]: network2.provider,
        },
        multicallAddresses: {
            ...network1.multicallAddresses,
            ...network2.multicallAddresses,
        },
        multicallVersion,
        pollingInterval: 100,
        connectors: {
            metamask: new implementations_1.MetamaskConnector(),
        },
    };
    return {
        config,
        network1,
        network2,
    };
};
exports.setupTestingConfig = setupTestingConfig;
//# sourceMappingURL=setupTestingConfig.js.map