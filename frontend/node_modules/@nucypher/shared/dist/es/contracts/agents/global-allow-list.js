import { getContract } from '@nucypher/nucypher-contracts';
import { DEFAULT_WAIT_N_CONFIRMATIONS } from '../const';
import { GlobalAllowList__factory } from '../ethers-typechain';
export class GlobalAllowListAgent {
    static async registerEncrypters(provider, signer, domain, ritualId, encrypters) {
        const globalAllowList = await this.connectReadWrite(provider, domain, signer);
        const tx = await globalAllowList.authorize(ritualId, encrypters);
        await tx.wait(DEFAULT_WAIT_N_CONFIRMATIONS);
    }
    static async connectReadOnly(provider, domain) {
        return await this.connect(provider, domain);
    }
    static async connectReadWrite(provider, domain, signer) {
        return await this.connect(provider, domain, signer);
    }
    static async connect(provider, domain, signer) {
        const network = await provider.getNetwork();
        const contractAddress = getContract(domain, network.chainId, 'GlobalAllowList');
        return GlobalAllowList__factory.connect(contractAddress, signer ?? provider);
    }
}
//# sourceMappingURL=global-allow-list.js.map