"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionExpression = void 0;
const nucypher_core_1 = require("@nucypher/nucypher-core");
const shared_1 = require("@nucypher/shared");
const semver_1 = require("semver");
const condition_factory_1 = require("./condition-factory");
const context_1 = require("./context");
const ERR_VERSION = (provided, current) => `Version provided, ${provided}, is incompatible with current version, ${current}`;
const ERR_CONDITION = (condition) => `Invalid condition: unrecognized condition data ${JSON.stringify(condition)}`;
class ConditionExpression {
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
        const receivedVersion = new semver_1.SemVer(obj.version);
        const currentVersion = new semver_1.SemVer(ConditionExpression.version);
        if (receivedVersion.major > currentVersion.major) {
            throw new Error(ERR_VERSION(obj.version, ConditionExpression.version));
        }
        if (!obj.condition) {
            throw new Error(ERR_CONDITION(obj.condition));
        }
        const condition = condition_factory_1.ConditionFactory.conditionFromProps(obj.condition);
        return new ConditionExpression(condition, obj.version);
    }
    toJson() {
        return (0, shared_1.toJSON)(this.toObj());
    }
    static fromJSON(json) {
        return ConditionExpression.fromObj(JSON.parse(json));
    }
    toWASMConditions() {
        return new nucypher_core_1.Conditions((0, shared_1.toJSON)(this.toObj()));
    }
    static fromWASMConditions(conditions) {
        return ConditionExpression.fromJSON(conditions.toString());
    }
    buildContext(provider, customParameters = {}, signer) {
        return new context_1.ConditionContext(provider, this.condition, customParameters, signer);
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
exports.ConditionExpression = ConditionExpression;
//# sourceMappingURL=condition-expr.js.map