import { BigNumber, BigNumberish } from 'ethers';
import { Currency } from './Currency';
import { CurrencyFormatOptions } from './formatting';
/**
 * The `CurrencyValue` class represents a value tied to a currency. The methods include:
 * - `static fromString(currency, value)` - creates a new CurrencyValue from string.
 * - `static zero(currency)` - creates a new CurrencyValue equal to 0.
 * - `toString()` - returns the value of the CurrencyValue as a decimal string with no formatting.
 * - `format(overrideOptions?)` - formats the value according to the currency. The caller can override the formatting options.
 * - `map(fn)` - returns a new CurrencyValue with value transformed by the callback.
 * - `add(other)` - returns a new CurrencyValue with value being the sum of this value and other value. The argument must be a CurrencyValue with the same Currency.
 * - `sub(other)` - returns a new CurrencyValue with value being the difference of this value and other value. The argument must be a CurrencyValue with the same Currency.
 * - `mul(value)` - returns a new CurrencyValue with value multiplied by the argument.
 * - `div(value)` - returns a new CurrencyValue with value divided by the argument.
 * - `mod(value)` - returns a new CurrencyValue with value modulo the argument.
 * - `equals(other)` - performs an equality check on the currencies and the values of both objects.
 * - `lt(other)` - checks if this value is less than the other value. The argument must be a CurrencyValue with the same Currency.
 * - `lte(other)` - checks if this value is less than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
 * - `gt(other)` - checks if this value is greater than the other value. The argument must be a CurrencyValue with the same Currency.
 * - `gte(other)` - checks if this value is greater than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
 * - `isZero()` - returns true if the value is zero.
 *
 * @public
 */
export declare class CurrencyValue {
    readonly currency: Currency;
    readonly value: BigNumber;
    constructor(currency: Currency, value: BigNumber);
    static fromString(currency: Currency, value: string): CurrencyValue;
    static zero(currency: Currency): CurrencyValue;
    toString(): string;
    format(overrideOptions?: Partial<CurrencyFormatOptions>): string;
    private checkCurrency;
    map(fn: (value: BigNumber) => BigNumber): CurrencyValue;
    add(other: CurrencyValue): CurrencyValue;
    sub(other: CurrencyValue): CurrencyValue;
    mul(value: BigNumberish): CurrencyValue;
    div(value: BigNumberish): CurrencyValue;
    mod(value: BigNumberish): CurrencyValue;
    equals(other: CurrencyValue): boolean;
    lt(other: CurrencyValue): boolean;
    lte(other: CurrencyValue): boolean;
    gt(other: CurrencyValue): boolean;
    gte(other: CurrencyValue): boolean;
    isZero(): boolean;
}
//# sourceMappingURL=CurrencyValue.d.ts.map