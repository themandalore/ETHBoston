import type { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import type { GlobalAllowList, GlobalAllowListInterface } from '../GlobalAllowList';
export declare class GlobalAllowList__factory {
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "_coordinator";
            readonly type: "address";
            readonly internalType: "contract Coordinator";
        }];
    }, {
        readonly type: "error";
        readonly name: "ECDSAInvalidSignature";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ECDSAInvalidSignatureLength";
        readonly inputs: readonly [{
            readonly name: "length";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "error";
        readonly name: "ECDSAInvalidSignatureS";
        readonly inputs: readonly [{
            readonly name: "s";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "event";
        readonly name: "AddressAuthorizationSet";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "_address";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "isAuthorized";
            readonly type: "bool";
            readonly internalType: "bool";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "function";
        readonly name: "authorize";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "addresses";
            readonly type: "address[]";
            readonly internalType: "address[]";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "coordinator";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "contract Coordinator";
        }];
    }, {
        readonly type: "function";
        readonly name: "deauthorize";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "addresses";
            readonly type: "address[]";
            readonly internalType: "address[]";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "isAddressAuthorized";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "encryptor";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
    }, {
        readonly type: "function";
        readonly name: "isAuthorized";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "evidence";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }, {
            readonly name: "ciphertextHeader";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
    }];
    static createInterface(): GlobalAllowListInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): GlobalAllowList;
}
