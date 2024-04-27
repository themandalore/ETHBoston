import { z } from 'zod';
import { Condition } from '../condition';
import { OmitConditionType } from '../shared';
export declare const RpcConditionType = "rpc";
export declare const rpcConditionSchema: z.ZodObject<{
    conditionType: z.ZodDefault<z.ZodLiteral<"rpc">>;
    chain: z.ZodNever | z.ZodLiteral<z.Primitive> | z.ZodUnion<[z.ZodLiteral<z.Primitive>, z.ZodLiteral<z.Primitive>, ...z.ZodLiteral<z.Primitive>[]]>;
    method: z.ZodEnum<["eth_getBalance"]>;
    parameters: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodLiteral<":userAddress">]>, "atleastone">, z.ZodTuple<[z.ZodUnion<[z.ZodString, z.ZodLiteral<":userAddress">]>, z.ZodType<any, z.ZodTypeDef, any>], null>]>;
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
    conditionType: "rpc";
    method: "eth_getBalance";
    parameters: ([string, ...string[]] | [string, any]) & ([string, ...string[]] | [string, any] | undefined);
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    chain?: z.Primitive;
}, {
    method: "eth_getBalance";
    parameters: ([string, ...string[]] | [string, any]) & ([string, ...string[]] | [string, any] | undefined);
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    conditionType?: "rpc" | undefined;
    chain?: z.Primitive;
}>;
export type RpcConditionProps = z.infer<typeof rpcConditionSchema>;
export declare class RpcCondition extends Condition {
    constructor(value: OmitConditionType<RpcConditionProps>);
}
