"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenList = void 0;
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
/**
 * Fetches ERC20 token list under a given address and filters them by chain id. Optionally it can filter also by token tags.
 * @public
 * @param tokenListURI URI to fetch token list from
 * @param overrideChainId chain id to filter tokens by (if not specified then current network is used)
 * @param tags list of tags to filter tokens by (token is included if it contains any of given tags)
 * @returns
 *   `name`: `string` - token list name.
 *   `logoURI`: `string` - URI to get token list logo from.
 *   `tokens`: `TokenInfo[]` - list of `TokenInfo` objects.
 *   If an error occurs `undefined` is returned.
 *
 * @example
 * const { name, logoURI, tokens } = useTokenList(UNISWAP_DEFAULT_TOKEN_LIST_URI) || {}
 * const httpSource = logoURI && logoURI.startsWith('ipfs') ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/') : logoURI
 * return (
 *   <div>
 *     <div>
 *       {name}
 *       {httpSource && <img src={httpSource} alt={name}/>}
 *     </div>
 *     <ol>
 *       {tokens?.map(token => (
 *         <li>
 *           <ul>
 *             <li>Name: {token.name}</li>
 *             <li>Symbol: {token.symbol}</li>
 *             <li>Decimals: {token.decimals}</li>
 *             <li>Address: {token.address}</li>
 *           </ul>
 *         </li>
 *       ))}
 *     </ol>
 *   </div>
 * )
 * @see [Token lists](https://uniswap.org/blog/token-lists)
 * @see [Token list json example](https://github.com/Uniswap/token-lists/blob/main/test/schema/example.tokenlist.json)
 * @see [`TokenInfo` object](https://github.com/Uniswap/token-lists/blob/main/src/types.ts)
 */
function useTokenList(tokenListURI, overrideChainId, tags) {
    const { chainId: providerChainId } = (0, useEthers_1.useEthers)();
    const [tokenList, setTokenList] = (0, react_1.useState)();
    const chainId = overrideChainId || providerChainId;
    (0, react_1.useEffect)(() => {
        fetch(tokenListURI)
            .then(async (response) => {
            if (response.ok) {
                const { name, logoURI, tokens } = await response.json();
                setTokenList({
                    name,
                    logoURI,
                    tokens: tokens.filter((token) => {
                        const sameChainId = token.chainId === chainId;
                        if (!tags) {
                            return sameChainId;
                        }
                        return sameChainId && token.tags && token.tags.some((tag) => tags.includes(tag));
                    }),
                });
            }
            else {
                const errorMessage = await response.text();
                return Promise.reject(new Error(errorMessage));
            }
        })
            .catch((err) => {
            console.log(err);
            setTokenList(undefined);
        });
    }, [tokenListURI, chainId]);
    return tokenList;
}
exports.useTokenList = useTokenList;
//# sourceMappingURL=useTokenList.js.map