"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalAllowListAgent = void 0;
const nucypher_contracts_1 = require("@nucypher/nucypher-contracts");
const const_1 = require("../const");
const ethers_typechain_1 = require("../ethers-typechain");
class GlobalAllowListAgent {
    static async registerEncrypters(provider, signer, domain, ritualId, encrypters) {
        const globalAllowList = await this.connectReadWrite(provider, domain, signer);
        const tx = await globalAllowList.authorize(ritualId, encrypters);
        await tx.wait(const_1.DEFAULT_WAIT_N_CONFIRMATIONS);
    }
    static async connectReadOnly(provider, domain) {
        return await this.connect(provider, domain);
    }
    static async connectReadWrite(provider, domain, signer) {
        return await this.connect(provider, domain, signer);
    }
    static async connect(provider, domain, signer) {
        const network = await provider.getNetwork();
        const contractAddress = (0, nucypher_contracts_1.getContract)(domain, network.chainId, 'GlobalAllowList');
        return ethers_typechain_1.GlobalAllowList__factory.connect(contractAddress, signer ?? provider);
    }
}
exports.GlobalAllowListAgent = GlobalAllowListAgent;
//# sourceMappingURL=global-allow-list.js.map