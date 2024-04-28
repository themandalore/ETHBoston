import { z } from 'zod';
import { Condition } from '../condition';
import { rpcConditionSchema } from './rpc';
// TimeCondition is an RpcCondition with the method set to 'blocktime' and no parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { parameters: _, ...restShape } = rpcConditionSchema.shape;
export const TimeConditionType = 'time';
export const TimeConditionMethod = 'blocktime';
export const timeConditionSchema = z.object({
    ...restShape,
    conditionType: z.literal(TimeConditionType).default(TimeConditionType),
    method: z.literal(TimeConditionMethod).default(TimeConditionMethod),
});
export class TimeCondition extends Condition {
    constructor(value) {
        super(timeConditionSchema, {
            conditionType: TimeConditionType,
            ...value,
        });
    }
}
//# sourceMappingURL=time.js.map