import { z } from 'zod';
export declare const contextParamSchema: z.ZodString;
export declare const plainStringSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const paramOrContextParamSchema: z.ZodSchema;
export declare const returnValueTestSchema: z.ZodObject<{
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
export type ReturnValueTestProps = z.infer<typeof returnValueTestSchema>;
export declare const EthAddressOrUserAddressSchema: z.ZodUnion<[z.ZodString, z.ZodLiteral<":userAddress">]>;
export type OmitConditionType<T> = Omit<T, 'conditionType'>;
