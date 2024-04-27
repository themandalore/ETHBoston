import { z } from 'zod';
import { Condition } from '../condition';
import { SUPPORTED_CHAIN_IDS } from '../const';
import { EthAddressOrUserAddressSchema, paramOrContextParamSchema, returnValueTestSchema, } from '../shared';
import createUnionSchema from '../zod';
export const RpcConditionType = 'rpc';
export const rpcConditionSchema = z.object({
    conditionType: z.literal(RpcConditionType).default(RpcConditionType),
    chain: createUnionSchema(SUPPORTED_CHAIN_IDS),
    method: z.enum(['eth_getBalance']),
    parameters: z.union([
        z.array(EthAddressOrUserAddressSchema).nonempty(),
        // Using tuple here because ordering matters
        z.tuple([EthAddressOrUserAddressSchema, paramOrContextParamSchema]),
    ]),
    returnValueTest: returnValueTestSchema, // Update to allow multiple return values after expanding supported methods
});
export class RpcCondition extends Condition {
    constructor(value) {
        super(rpcConditionSchema, {
            conditionType: RpcConditionType,
            ...value,
        });
    }
}
//# sourceMappingURL=rpc.js.map