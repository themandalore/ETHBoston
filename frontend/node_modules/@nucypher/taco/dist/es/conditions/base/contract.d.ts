import { z } from 'zod';
import { Condition } from '../condition';
import { OmitConditionType } from '../shared';
declare const functionAbiSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    type: z.ZodLiteral<"function">;
    inputs: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<[string, ...string[]]>;
        internalType: z.ZodEnum<[string, ...string[]]>;
    }, "strict", z.ZodTypeAny, {
        type: string;
        name: string;
        internalType: string;
    }, {
        type: string;
        name: string;
        internalType: string;
    }>, "many">;
    outputs: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<[string, ...string[]]>;
        internalType: z.ZodEnum<[string, ...string[]]>;
    }, "strict", z.ZodTypeAny, {
        type: string;
        name: string;
        internalType: string;
    }, {
        type: string;
        name: string;
        internalType: string;
    }>, "atleastone">;
    stateMutability: z.ZodUnion<[z.ZodLiteral<"view">, z.ZodLiteral<"pure">]>;
}, "strict", z.ZodTypeAny, {
    type: "function";
    name: string;
    inputs: {
        type: string;
        name: string;
        internalType: string;
    }[];
    outputs: [{
        type: string;
        name: string;
        internalType: string;
    }, ...{
        type: string;
        name: string;
        internalType: string;
    }[]];
    stateMutability: "view" | "pure";
}, {
    type: "function";
    name: string;
    inputs: {
        type: string;
        name: string;
        internalType: string;
    }[];
    outputs: [{
        type: string;
        name: string;
        internalType: string;
    }, ...{
        type: string;
        name: string;
        internalType: string;
    }[]];
    stateMutability: "view" | "pure";
}>, {
    type: "function";
    name: string;
    inputs: {
        type: string;
        name: string;
        internalType: string;
    }[];
    outputs: [{
        type: string;
        name: string;
        internalType: string;
    }, ...{
        type: string;
        name: string;
        internalType: string;
    }[]];
    stateMutability: "view" | "pure";
}, {
    type: "function";
    name: string;
    inputs: {
        type: string;
        name: string;
        internalType: string;
    }[];
    outputs: [{
        type: string;
        name: string;
        internalType: string;
    }, ...{
        type: string;
        name: string;
        internalType: string;
    }[]];
    stateMutability: "view" | "pure";
}>, {
    type: "function";
    name: string;
    inputs: {
        type: string;
        name: string;
        internalType: string;
    }[];
    outputs: [{
        type: string;
        name: string;
        internalType: string;
    }, ...{
        type: string;
        name: string;
        internalType: string;
    }[]];
    stateMutability: "view" | "pure";
}, {
    type: "function";
    name: string;
    inputs: {
        type: string;
        name: string;
        internalType: string;
    }[];
    outputs: [{
        type: string;
        name: string;
        internalType: string;
    }, ...{
        type: string;
        name: string;
        internalType: string;
    }[]];
    stateMutability: "view" | "pure";
}>;
export type FunctionAbiProps = z.infer<typeof functionAbiSchema>;
export declare const ContractConditionType = "contract";
export declare const contractConditionSchema: z.ZodEffects<z.ZodObject<{
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
    conditionType: z.ZodDefault<z.ZodLiteral<"contract">>;
    contractAddress: z.ZodString;
    standardContractType: z.ZodOptional<z.ZodEnum<["ERC20", "ERC721"]>>;
    method: z.ZodString;
    functionAbi: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"function">;
        inputs: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<[string, ...string[]]>;
            internalType: z.ZodEnum<[string, ...string[]]>;
        }, "strict", z.ZodTypeAny, {
            type: string;
            name: string;
            internalType: string;
        }, {
            type: string;
            name: string;
            internalType: string;
        }>, "many">;
        outputs: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<[string, ...string[]]>;
            internalType: z.ZodEnum<[string, ...string[]]>;
        }, "strict", z.ZodTypeAny, {
            type: string;
            name: string;
            internalType: string;
        }, {
            type: string;
            name: string;
            internalType: string;
        }>, "atleastone">;
        stateMutability: z.ZodUnion<[z.ZodLiteral<"view">, z.ZodLiteral<"pure">]>;
    }, "strict", z.ZodTypeAny, {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    }, {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    }>, {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    }, {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    }>, {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    }, {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    }>>;
    parameters: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
}, "strip", z.ZodTypeAny, {
    conditionType: "contract";
    method: string;
    parameters: any[];
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    contractAddress: string;
    chain?: z.Primitive;
    standardContractType?: "ERC20" | "ERC721" | undefined;
    functionAbi?: {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    } | undefined;
}, {
    method: string;
    parameters: any[];
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    contractAddress: string;
    chain?: z.Primitive;
    conditionType?: "contract" | undefined;
    standardContractType?: "ERC20" | "ERC721" | undefined;
    functionAbi?: {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    } | undefined;
}>, {
    conditionType: "contract";
    method: string;
    parameters: any[];
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    contractAddress: string;
    chain?: z.Primitive;
    standardContractType?: "ERC20" | "ERC721" | undefined;
    functionAbi?: {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    } | undefined;
}, {
    method: string;
    parameters: any[];
    returnValueTest: {
        comparator: "==" | ">" | "<" | ">=" | "<=" | "!=";
        index?: number | undefined;
        value?: any;
    };
    contractAddress: string;
    chain?: z.Primitive;
    conditionType?: "contract" | undefined;
    standardContractType?: "ERC20" | "ERC721" | undefined;
    functionAbi?: {
        type: "function";
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        outputs: [{
            type: string;
            name: string;
            internalType: string;
        }, ...{
            type: string;
            name: string;
            internalType: string;
        }[]];
        stateMutability: "view" | "pure";
    } | undefined;
}>;
export type ContractConditionProps = z.infer<typeof contractConditionSchema>;
export declare class ContractCondition extends Condition {
    constructor(value: OmitConditionType<ContractConditionProps>);
}
export {};
