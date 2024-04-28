"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.NativeCurrency = exports.FiatCurrency = exports.Currency = void 0;
const formatting_1 = require("./formatting");
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
class Currency {
    constructor(name, ticker, decimals, formattingOptions = {}) {
        this.name = name;
        this.ticker = ticker;
        this.decimals = decimals;
        this.formattingOptions = { ...formatting_1.DEFAULT_OPTIONS, decimals, ...formattingOptions };
    }
    format(value, overrideOptions = {}) {
        return (0, formatting_1.formatCurrency)({ ...this.formattingOptions, ...overrideOptions }, value);
    }
}
exports.Currency = Currency;
class FiatCurrency extends Currency {
    constructor(name, ticker, decimals = 2, formattingOptions = {}) {
        super(name, ticker, decimals, {
            useFixedPrecision: true,
            fixedPrecisionDigits: decimals,
            ...formattingOptions,
        });
    }
}
exports.FiatCurrency = FiatCurrency;
class NativeCurrency extends Currency {
    constructor(name, ticker, chainId, decimals = 18, formattingOptions = {}) {
        super(name, ticker, decimals, {
            suffix: ` ${ticker}`,
            significantDigits: 6,
            ...formattingOptions,
        });
        this.chainId = chainId;
    }
}
exports.NativeCurrency = NativeCurrency;
class Token extends Currency {
    constructor(name, ticker, chainId, address, decimals = 18, formattingOptions = {}) {
        super(name, ticker, decimals, {
            suffix: ` ${ticker}`,
            significantDigits: 6,
            ...formattingOptions,
        });
        this.chainId = chainId;
        this.address = address;
    }
}
exports.Token = Token;
//# sourceMappingURL=Currency.js.map