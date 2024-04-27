import { z } from 'zod';
type ConditionSchema = z.ZodSchema;
export type ConditionProps = z.infer<ConditionSchema>;
export declare class Condition {
    readonly schema: ConditionSchema;
    readonly value: ConditionProps;
    constructor(schema: ConditionSchema, value: ConditionProps);
    static validate(schema: ConditionSchema, value: ConditionProps): {
        data?: ConditionProps;
        error?: z.ZodError;
    };
    requiresSigner(): boolean;
    toObj(): any;
    equals(other: Condition): boolean;
}
export {};
