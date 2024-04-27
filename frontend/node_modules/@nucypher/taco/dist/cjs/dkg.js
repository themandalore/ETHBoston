"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DkgClient = exports.DkgRitual = void 0;
const nucypher_core_1 = require("@nucypher/nucypher-core");
const shared_1 = require("@nucypher/shared");
class DkgRitual {
    id;
    dkgPublicKey;
    sharesNum;
    threshold;
    state;
    constructor(id, dkgPublicKey, sharesNum, threshold, state) {
        this.id = id;
        this.dkgPublicKey = dkgPublicKey;
        this.sharesNum = sharesNum;
        this.threshold = threshold;
        this.state = state;
    }
    toObj() {
        return {
            id: this.id,
            dkgPublicKey: this.dkgPublicKey.toBytes(),
            sharesNum: this.sharesNum,
            threshold: this.threshold,
            state: this.state,
        };
    }
    static fromObj({ id, dkgPublicKey, sharesNum, threshold, state, }) {
        return new DkgRitual(id, nucypher_core_1.DkgPublicKey.fromBytes(dkgPublicKey), sharesNum, threshold, state);
    }
    equals(other) {
        return [
            this.id === other.id,
            this.dkgPublicKey.equals(other.dkgPublicKey),
            this.sharesNum === other.sharesNum,
            this.threshold === other.threshold,
            this.state === other.state,
        ].every(Boolean);
    }
}
exports.DkgRitual = DkgRitual;
const ERR_RITUAL_NOT_FINALIZED = (ritualId, ritual) => `Ritual ${ritualId} is not finalized. State: ${ritual.state}`;
class DkgClient {
    static async initializeRitual(provider, signer, domain, ursulas, authority, duration, accessController, waitUntilEnd = false) {
        const ritualId = await shared_1.DkgCoordinatorAgent.initializeRitual(provider, signer, domain, ursulas.sort(), // Contract call requires sorted addresses
        authority, duration, accessController);
        if (waitUntilEnd) {
            const isSuccessful = await DkgClient.waitUntilRitualEnd(provider, domain, ritualId);
            if (!isSuccessful) {
                const ritualState = await shared_1.DkgCoordinatorAgent.getRitualState(provider, domain, ritualId);
                throw new Error(`Ritual initialization failed. Ritual id ${ritualId} is in state ${ritualState}`);
            }
        }
        return ritualId;
    }
    static waitUntilRitualEnd = async (provider, domain, ritualId) => {
        return new Promise((resolve, reject) => {
            const callback = (successful) => {
                if (successful) {
                    resolve(true);
                }
                else {
                    reject();
                }
            };
            shared_1.DkgCoordinatorAgent.onRitualEndEvent(provider, domain, ritualId, callback);
        });
    };
    static async getRitual(provider, domain, ritualId) {
        const ritualState = await shared_1.DkgCoordinatorAgent.getRitualState(provider, domain, ritualId);
        const ritual = await shared_1.DkgCoordinatorAgent.getRitual(provider, domain, ritualId);
        const dkgPkBytes = new Uint8Array([
            ...(0, shared_1.fromHexString)(ritual.publicKey.word0),
            ...(0, shared_1.fromHexString)(ritual.publicKey.word1),
        ]);
        return new DkgRitual(ritualId, nucypher_core_1.DkgPublicKey.fromBytes(dkgPkBytes), ritual.dkgSize, ritual.threshold, ritualState);
    }
    static async getActiveRitual(provider, domain, ritualId) {
        const ritual = await DkgClient.getRitual(provider, domain, ritualId);
        if (ritual.state !== shared_1.DkgRitualState.ACTIVE) {
            throw new Error(ERR_RITUAL_NOT_FINALIZED(ritualId, ritual));
        }
        return ritual;
    }
}
exports.DkgClient = DkgClient;
//# sourceMappingURL=dkg.js.map