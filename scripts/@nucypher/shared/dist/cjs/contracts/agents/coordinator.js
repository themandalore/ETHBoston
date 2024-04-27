"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DkgCoordinatorAgent = exports.DkgRitualState = void 0;
const nucypher_contracts_1 = require("@nucypher/nucypher-contracts");
const nucypher_core_1 = require("@nucypher/nucypher-core");
const utils_1 = require("../../utils");
const const_1 = require("../const");
const ethers_typechain_1 = require("../ethers-typechain");
var DkgRitualState;
(function (DkgRitualState) {
    DkgRitualState[DkgRitualState["NON_INITIATED"] = 0] = "NON_INITIATED";
    DkgRitualState[DkgRitualState["DKG_AWAITING_TRANSCRIPTS"] = 1] = "DKG_AWAITING_TRANSCRIPTS";
    DkgRitualState[DkgRitualState["DKG_AWAITING_AGGREGATIONS"] = 2] = "DKG_AWAITING_AGGREGATIONS";
    DkgRitualState[DkgRitualState["DKG_TIMEOUT"] = 3] = "DKG_TIMEOUT";
    DkgRitualState[DkgRitualState["DKG_INVALID"] = 4] = "DKG_INVALID";
    DkgRitualState[DkgRitualState["ACTIVE"] = 5] = "ACTIVE";
    DkgRitualState[DkgRitualState["EXPIRED"] = 6] = "EXPIRED";
})(DkgRitualState || (exports.DkgRitualState = DkgRitualState = {}));
class DkgCoordinatorAgent {
    static async getParticipants(provider, domain, ritualId, maxParticipants) {
        const coordinator = await this.connectReadOnly(provider, domain);
        const participants = await coordinator['getParticipants(uint32,uint256,uint256,bool)'](ritualId, 0, maxParticipants, false);
        return participants.map((participant) => {
            return {
                provider: participant.provider,
                aggregated: participant.aggregated,
                decryptionRequestStaticKey: nucypher_core_1.SessionStaticKey.fromBytes((0, utils_1.fromHexString)(participant.decryptionRequestStaticKey)),
            };
        });
    }
    static async initializeRitual(provider, signer, domain, providers, authority, duration, accessController) {
        const coordinator = await this.connectReadWrite(provider, domain, signer);
        const tx = await coordinator.initiateRitual(providers, authority, duration, accessController);
        const txReceipt = await tx.wait(const_1.DEFAULT_WAIT_N_CONFIRMATIONS);
        const [ritualStartEvent] = txReceipt.events ?? [];
        if (!ritualStartEvent) {
            throw new Error('Ritual start event not found');
        }
        return ritualStartEvent.args?.ritualId;
    }
    static async getRitual(provider, domain, ritualId) {
        const coordinator = await this.connectReadOnly(provider, domain);
        return await coordinator.rituals(ritualId);
    }
    static async getRitualState(provider, domain, ritualId) {
        const coordinator = await this.connectReadOnly(provider, domain);
        return await coordinator.getRitualState(ritualId);
    }
    static async onRitualEndEvent(provider, domain, ritualId, callback) {
        const coordinator = await this.connectReadOnly(provider, domain);
        // We leave `initiator` undefined because we don't care who the initiator is
        // We leave `successful` undefined because we don't care if the ritual was successful
        const eventFilter = coordinator.filters.EndRitual(ritualId, undefined);
        coordinator.once(eventFilter, (_ritualId, successful) => {
            callback(successful);
        });
    }
    static async getRitualIdFromPublicKey(provider, domain, dkgPublicKey) {
        const coordinator = await this.connectReadOnly(provider, domain);
        const dkgPublicKeyBytes = dkgPublicKey.toBytes();
        const pointStruct = {
            word0: dkgPublicKeyBytes.slice(0, 32),
            word1: dkgPublicKeyBytes.slice(32, 48),
        };
        return await coordinator.getRitualIdFromPublicKey(pointStruct);
    }
    static async isEncryptionAuthorized(provider, domain, ritualId, thresholdMessageKit) {
        const coordinator = await this.connectReadOnly(provider, domain);
        return await coordinator.isEncryptionAuthorized(ritualId, thresholdMessageKit.acp.authorization, thresholdMessageKit.ciphertextHeader.toBytes());
    }
    static async connectReadOnly(provider, domain) {
        return await this.connect(provider, domain);
    }
    static async connectReadWrite(provider, domain, signer) {
        return await this.connect(provider, domain, signer);
    }
    static async connect(provider, domain, signer) {
        const network = await provider.getNetwork();
        const contractAddress = (0, nucypher_contracts_1.getContract)(domain, network.chainId, 'Coordinator');
        return ethers_typechain_1.Coordinator__factory.connect(contractAddress, signer ?? provider);
    }
}
exports.DkgCoordinatorAgent = DkgCoordinatorAgent;
//# sourceMappingURL=coordinator.js.map