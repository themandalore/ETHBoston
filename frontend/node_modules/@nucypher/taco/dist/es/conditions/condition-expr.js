import { Conditions as WASMConditions } from '@nucypher/nucypher-core';
import { toJSON } from '@nucypher/shared';
import { SemVer } from 'semver';
import { ConditionFactory } from './condition-factory';
import { ConditionContext } from './context';
const ERR_VERSION = (provided, current) => `Version provided, ${provided}, is incompatible with current version, ${current}`;
const ERR_CONDITION = (condition) => `Invalid condition: unrecognized condition data ${JSON.stringify(condition)}`;
export class ConditionExpression {
    condition;
    version;
    static version = '1.0.0';
    constructor(condition, version = ConditionExpression.version) {
        this.condition = condition;
        this.version = version;
    }
    toObj() {
        const condition = this.condition.toObj();
        return {
            version: this.version,
            condition,
        };
    }
    static fromObj(obj) {
        const receivedVersion = new SemVer(obj.version);
        const currentVersion = new SemVer(ConditionExpression.version);
        if (receivedVersion.major > currentVersion.major) {
            throw new Error(ERR_VERSION(obj.version, ConditionExpression.version));
        }
        if (!obj.condition) {
            throw new Error(ERR_CONDITION(obj.condition));
        }
        const condition = ConditionFactory.conditionFromProps(obj.condition);
        return new ConditionExpression(condition, obj.version);
    }
    toJson() {
        return toJSON(this.toObj());
    }
    static fromJSON(json) {
        return ConditionExpression.fromObj(JSON.parse(json));
    }
    toWASMConditions() {
        return new WASMConditions(toJSON(this.toObj()));
    }
    static fromWASMConditions(conditions) {
        return ConditionExpression.fromJSON(conditions.toString());
    }
    buildContext(provider, customParameters = {}, signer) {
        return new ConditionContext(provider, this.condition, customParameters, signer);
    }
    contextRequiresSigner() {
        return this.condition.requiresSigner();
    }
    equals(other) {
        return [
            this.version === other.version,
            this.condition.equals(other.condition),
        ].every(Boolean);
    }
}
//# sourceMappingURL=condition-expr.js.map