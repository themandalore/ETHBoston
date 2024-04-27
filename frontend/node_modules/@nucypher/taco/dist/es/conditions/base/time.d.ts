import { z } from 'zod';
import { Condition } from '../condition';
import { OmitConditionType } from '../shared';
export declare const TimeConditionType = "time";
export declare const TimeConditionMethod = "blocktime";
export declare const timeConditionSchema: z.ZodObject<{
    conditionType: z.ZodDefault<z.ZodLiteral<"time">>;
    method: z.ZodDefault<z.ZodLiteral<"blocktime">>;
    chain: z.ZodNever | z.ZodLiteral<z.Primitive> | z.ZodUnion<[z.ZodLiteral<z.Primitive>, z.ZodLiteral<z.Primitive>, ...z.ZodLiteral<z.Primitive>[]]>;
    returnValueTest: z.ZodObject<{
        index: z.ZodOptional<z.ZodNumber>;
        comparator: z.ZodEnum<["==", ">", "<", ">=", "<=", "!="]>;
        value: z.ZodType<any, z.ZodTypeDef, any>;
    }, "strip", z.ZodTypeAny, {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    }, {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    conditionType: "time";
    method: "blocktime";
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    chain?: z.Primitive;
}, {
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    conditionType?: "time" | undefined;
    method?: "blocktime" | undefined;
    chain?: z.Primitive;
}>;
export type TimeConditionProps = z.infer<typeof timeConditionSchema>;
export declare class TimeCondition extends Condition {
    constructor(value: OmitConditionType<TimeConditionProps>);
}
