"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreSubscriptionManagerAgent = void 0;
const nucypher_contracts_1 = require("@nucypher/nucypher-contracts");
const ethers_1 = require("ethers");
const const_1 = require("../const");
const ethers_typechain_1 = require("../ethers-typechain");
class PreSubscriptionManagerAgent {
    static async createPolicy(provider, signer, domain, valueInWei, policyId, size, startTimestamp, endTimestamp, ownerAddress) {
        const subscriptionManager = await this.connectReadWrite(provider, domain, signer);
        const overrides = {
            value: valueInWei.toString(),
        };
        const estimatedGas = await subscriptionManager.estimateGas.createPolicy(ethers_1.utils.hexlify(policyId), ownerAddress, size, startTimestamp, endTimestamp, overrides);
        const tx = await subscriptionManager.createPolicy(ethers_1.utils.hexlify(policyId), ownerAddress, size, startTimestamp, endTimestamp, { ...overrides, gasLimit: estimatedGas });
        await tx.wait(const_1.DEFAULT_WAIT_N_CONFIRMATIONS);
        return tx;
    }
    static async getPolicyCost(provider, domain, size, startTimestamp, endTimestamp) {
        const subscriptionManager = await this.connectReadOnly(provider, domain);
        return await subscriptionManager.getPolicyCost(size, startTimestamp, endTimestamp);
    }
    static async connectReadOnly(provider, domain) {
        return await this.connect(provider, domain);
    }
    static async connectReadWrite(provider, domain, signer) {
        return await this.connect(provider, domain, signer);
    }
    static async connect(provider, domain, signer) {
        const network = await provider.getNetwork();
        const contractAddress = (0, nucypher_contracts_1.getContract)(domain, network.chainId, 'SubscriptionManager');
        return ethers_typechain_1.SubscriptionManager__factory.connect(contractAddress, signer ?? provider);
    }
}
exports.PreSubscriptionManagerAgent = PreSubscriptionManagerAgent;
//# sourceMappingURL=subscription-manager.js.map