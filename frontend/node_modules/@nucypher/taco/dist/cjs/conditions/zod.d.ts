import { Primitive, z } from 'zod';
declare function createUnionSchema<T extends readonly Primitive[]>(values: T): z.ZodNever | z.ZodLiteral<Primitive> | z.ZodUnion<[z.ZodLiteral<Primitive>, z.ZodLiteral<Primitive>, ...z.ZodLiteral<Primitive>[]]>;
export default createUnionSchema;
