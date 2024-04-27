import { CurrencyFormatOptions } from './formatting';
/**
 * The ``Currency`` class is tasked with representing the individual currencies as well as handling formatting.
 *
 * The base ``Currency`` class is constructed with the following parameters:
 * - ``name`` - name of the currency
 * - ``ticker`` - e.g. USD, EUR, BTC
 * - ``decimals`` - number of decimal places (e.g. 2 for USD, 18 for ETH)
 * - ``formattingOptions`` - define how the currency values are formatted
 * The following formatting options are supported:
 * - ``decimals`` - Defaults to the decimals of the currency.
 * - ``thousandSeparator`` - Defaults to ``','``. Used for separating thousands.
 * - ``decimalSeparator`` - Defaults to ``'.'``. Used for separating the integer part from the decimal part.
 * - ``significantDigits`` - Defaults to Infinity. Can limit the number of digits on the decimal part, such that either the total number of displayed digits is equal to this parameter or more digits are displayed, but the decimal part is missing.
 * - ``useFixedPrecision`` - Defaults to false. Switches from using significant digits to fixed precision digits.
 * - ``fixedPrecisionDigits`` - Defaults to 0. Can specify the number of digits on the decimal part.
 * - ``prefix`` - Defaults to ``''``. Prepended to the result.
 * - ``suffix`` - Defaults to ``''``. Appended to the result.
 * Other variants of ``Currency`` include ``FiatCurrency``, ``NativeCurrency`` and ``Token``.
 * ``FiatCurrency`` takes the same parameters as ``Currency`` but uses fixed precision digits by default.
 * ``NativeCurrency`` additionally takes a ``chainId`` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.
 * ``Token`` additionally takes a ``chainId`` parameter as well as an ``address`` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.
 *
 * @public
 */
export declare class Currency {
    readonly name: string;
    readonly ticker: string;
    readonly decimals: number;
    formattingOptions: CurrencyFormatOptions;
    constructor(name: string, ticker: string, decimals: number, formattingOptions?: Partial<CurrencyFormatOptions>);
    format(value: string, overrideOptions?: Partial<CurrencyFormatOptions>): string;
}
export declare class FiatCurrency extends Currency {
    constructor(name: string, ticker: string, decimals?: number, formattingOptions?: Partial<CurrencyFormatOptions>);
}
export declare class NativeCurrency extends Currency {
    readonly chainId: number;
    constructor(name: string, ticker: string, chainId: number, decimals?: number, formattingOptions?: Partial<CurrencyFormatOptions>);
}
export declare class Token extends Currency {
    readonly chainId: number;
    readonly address: string;
    constructor(name: string, ticker: string, chainId: number, address: string, decimals?: number, formattingOptions?: Partial<CurrencyFormatOptions>);
}
//# sourceMappingURL=Currency.d.ts.map