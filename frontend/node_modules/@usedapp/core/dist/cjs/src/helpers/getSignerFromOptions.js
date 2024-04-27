"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignerFromOptions = void 0;
const ethers_1 = require("ethers");
const getSignerFromOptions = (provider, options, library) => {
    const privateKey = options && 'privateKey' in options && options.privateKey;
    const mnemonicPhrase = options && 'mnemonicPhrase' in options && options.mnemonicPhrase;
    const json = options && 'json' in options && options.json;
    const password = options && 'password' in options && options.password;
    const privateKeySigner = privateKey && provider && new ethers_1.ethers.Wallet(privateKey, provider);
    const mnemonicPhraseSigner = mnemonicPhrase && provider && ethers_1.ethers.Wallet.fromMnemonic(mnemonicPhrase).connect(provider);
    const encryptedJsonSigner = json && password && provider && ethers_1.ethers.Wallet.fromEncryptedJsonSync(json, password).connect(provider);
    const optionsSigner = options && 'signer' in options && options.signer;
    return (privateKeySigner ||
        mnemonicPhraseSigner ||
        encryptedJsonSigner ||
        optionsSigner ||
        (library && 'getSigner' in library ? library.getSigner() : undefined));
};
exports.getSignerFromOptions = getSignerFromOptions;
//# sourceMappingURL=getSignerFromOptions.js.map