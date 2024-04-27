import { getContract } from '@nucypher/nucypher-contracts';
import { utils as ethersUtils, } from 'ethers';
import { DEFAULT_WAIT_N_CONFIRMATIONS } from '../const';
import { SubscriptionManager__factory, } from '../ethers-typechain';
export class PreSubscriptionManagerAgent {
    static async createPolicy(provider, signer, domain, valueInWei, policyId, size, startTimestamp, endTimestamp, ownerAddress) {
        const subscriptionManager = await this.connectReadWrite(provider, domain, signer);
        const overrides = {
            value: valueInWei.toString(),
        };
        const estimatedGas = await subscriptionManager.estimateGas.createPolicy(ethersUtils.hexlify(policyId), ownerAddress, size, startTimestamp, endTimestamp, overrides);
        const tx = await subscriptionManager.createPolicy(ethersUtils.hexlify(policyId), ownerAddress, size, startTimestamp, endTimestamp, { ...overrides, gasLimit: estimatedGas });
        await tx.wait(DEFAULT_WAIT_N_CONFIRMATIONS);
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
        const contractAddress = getContract(domain, network.chainId, 'SubscriptionManager');
        return SubscriptionManager__factory.connect(contractAddress, signer ?? provider);
    }
}
//# sourceMappingURL=subscription-manager.js.map