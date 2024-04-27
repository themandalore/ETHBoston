import { z } from 'zod';
import { Condition, ConditionProps } from './condition';
import { OmitConditionType } from './shared';
export declare const CompoundConditionType = "compound";
export declare const compoundConditionSchema: z.ZodSchema;
export type CompoundConditionProps = z.infer<typeof compoundConditionSchema>;
export type ConditionOrProps = Condition | ConditionProps;
export declare class CompoundCondition extends Condition {
    constructor(value: OmitConditionType<CompoundConditionProps>);
    private static withOperator;
    static or(conditions: ConditionOrProps[]): CompoundCondition;
    static and(conditions: ConditionOrProps[]): CompoundCondition;
    static not(condition: ConditionOrProps): CompoundCondition;
}
