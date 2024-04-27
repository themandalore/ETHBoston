import type { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import type { Coordinator, CoordinatorInterface } from '../Coordinator';
export declare class Coordinator__factory {
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "_application";
            readonly type: "address";
            readonly internalType: "contract ITACoChildApplication";
        }, {
            readonly name: "_currency";
            readonly type: "address";
            readonly internalType: "contract IERC20";
        }, {
            readonly name: "_feeRatePerSecond";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "error";
        readonly name: "AccessControlBadConfirmation";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "AccessControlEnforcedDefaultAdminDelay";
        readonly inputs: readonly [{
            readonly name: "schedule";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
    }, {
        readonly type: "error";
        readonly name: "AccessControlEnforcedDefaultAdminRules";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "AccessControlInvalidDefaultAdmin";
        readonly inputs: readonly [{
            readonly name: "defaultAdmin";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "AccessControlUnauthorizedAccount";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "neededRole";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "error";
        readonly name: "AddressEmptyCode";
        readonly inputs: readonly [{
            readonly name: "target";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "AddressInsufficientBalance";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "FailedInnerCall";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "InvalidInitialization";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "NotInitializing";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "SafeCastOverflowedUintDowncast";
        readonly inputs: readonly [{
            readonly name: "bits";
            readonly type: "uint8";
            readonly internalType: "uint8";
        }, {
            readonly name: "value";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "error";
        readonly name: "SafeERC20FailedOperation";
        readonly inputs: readonly [{
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "event";
        readonly name: "AggregationPosted";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "node";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "aggregatedTranscriptDigest";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "DefaultAdminDelayChangeCanceled";
        readonly inputs: readonly [];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "DefaultAdminDelayChangeScheduled";
        readonly inputs: readonly [{
            readonly name: "newDelay";
            readonly type: "uint48";
            readonly internalType: "uint48";
            readonly indexed: false;
        }, {
            readonly name: "effectSchedule";
            readonly type: "uint48";
            readonly internalType: "uint48";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "DefaultAdminTransferCanceled";
        readonly inputs: readonly [];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "DefaultAdminTransferScheduled";
        readonly inputs: readonly [{
            readonly name: "newAdmin";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "acceptSchedule";
            readonly type: "uint48";
            readonly internalType: "uint48";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "EndRitual";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "successful";
            readonly type: "bool";
            readonly internalType: "bool";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Initialized";
        readonly inputs: readonly [{
            readonly name: "version";
            readonly type: "uint64";
            readonly internalType: "uint64";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "MaxDkgSizeChanged";
        readonly inputs: readonly [{
            readonly name: "oldSize";
            readonly type: "uint16";
            readonly internalType: "uint16";
            readonly indexed: false;
        }, {
            readonly name: "newSize";
            readonly type: "uint16";
            readonly internalType: "uint16";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "ParticipantPublicKeySet";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "participant";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "publicKey";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word2";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly internalType: "struct BLS12381.G2Point";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "ReimbursementPoolSet";
        readonly inputs: readonly [{
            readonly name: "pool";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RitualAuthorityTransferred";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "previousAuthority";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "newAuthority";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RoleAdminChanged";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: true;
        }, {
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: true;
        }, {
            readonly name: "newAdminRole";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RoleGranted";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: true;
        }, {
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "sender";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "RoleRevoked";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: true;
        }, {
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "sender";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "StartAggregationRound";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "StartRitual";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "authority";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "participants";
            readonly type: "address[]";
            readonly internalType: "address[]";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "TimeoutChanged";
        readonly inputs: readonly [{
            readonly name: "oldTimeout";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: false;
        }, {
            readonly name: "newTimeout";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "TranscriptPosted";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
            readonly indexed: true;
        }, {
            readonly name: "node";
            readonly type: "address";
            readonly internalType: "address";
            readonly indexed: true;
        }, {
            readonly name: "transcriptDigest";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "function";
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "function";
        readonly name: "INITIATOR_ROLE";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "function";
        readonly name: "TREASURY_ROLE";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "function";
        readonly name: "acceptDefaultAdminTransfer";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "application";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "contract ITACoChildApplication";
        }];
    }, {
        readonly type: "function";
        readonly name: "beginDefaultAdminTransfer";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "newAdmin";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "cancelDefaultAdminTransfer";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "changeDefaultAdminDelay";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "newDelay";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "cohortFingerprint";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly name: "nodes";
            readonly type: "address[]";
            readonly internalType: "address[]";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "function";
        readonly name: "currency";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "contract IERC20";
        }];
    }, {
        readonly type: "function";
        readonly name: "defaultAdmin";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "function";
        readonly name: "defaultAdminDelay";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
    }, {
        readonly type: "function";
        readonly name: "defaultAdminDelayIncreaseWait";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
    }, {
        readonly type: "function";
        readonly name: "feeDeduction";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "feeRatePerSecond";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "getAuthority";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "function";
        readonly name: "getParticipant";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "provider";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "transcript";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "provider";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "aggregated";
                readonly type: "bool";
                readonly internalType: "bool";
            }, {
                readonly name: "transcript";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "decryptionRequestStaticKey";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly internalType: "struct Coordinator.Participant";
        }];
    }, {
        readonly type: "function";
        readonly name: "getParticipantFromProvider";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "provider";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "provider";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "aggregated";
                readonly type: "bool";
                readonly internalType: "bool";
            }, {
                readonly name: "transcript";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "decryptionRequestStaticKey";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly internalType: "struct Coordinator.Participant";
        }];
    }, {
        readonly type: "function";
        readonly name: "getParticipants";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "provider";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "aggregated";
                readonly type: "bool";
                readonly internalType: "bool";
            }, {
                readonly name: "transcript";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "decryptionRequestStaticKey";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly internalType: "struct Coordinator.Participant[]";
        }];
    }, {
        readonly type: "function";
        readonly name: "getParticipants";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "startIndex";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "maxParticipants";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "includeTranscript";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "provider";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "aggregated";
                readonly type: "bool";
                readonly internalType: "bool";
            }, {
                readonly name: "transcript";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "decryptionRequestStaticKey";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly internalType: "struct Coordinator.Participant[]";
        }];
    }, {
        readonly type: "function";
        readonly name: "getProviderPublicKey";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "provider";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "ritualId";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word2";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly internalType: "struct BLS12381.G2Point";
        }];
    }, {
        readonly type: "function";
        readonly name: "getProviders";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address[]";
            readonly internalType: "address[]";
        }];
    }, {
        readonly type: "function";
        readonly name: "getPublicKeyFromRitualId";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes16";
                readonly internalType: "bytes16";
            }];
            readonly internalType: "struct BLS12381.G1Point";
        }];
    }, {
        readonly type: "function";
        readonly name: "getRitualIdFromPublicKey";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "dkgPublicKey";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes16";
                readonly internalType: "bytes16";
            }];
            readonly internalType: "struct BLS12381.G1Point";
        }];
        readonly outputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
    }, {
        readonly type: "function";
        readonly name: "getRitualInitiationCost";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "providers";
            readonly type: "address[]";
            readonly internalType: "address[]";
        }, {
            readonly name: "duration";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "getRitualState";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint8";
            readonly internalType: "enum Coordinator.RitualState";
        }];
    }, {
        readonly type: "function";
        readonly name: "getRoleAdmin";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "function";
        readonly name: "getThresholdForRitualSize";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly name: "size";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }];
    }, {
        readonly type: "function";
        readonly name: "grantRole";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "hasRole";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "account";
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
        readonly name: "initialize";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "_timeout";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "_maxDkgSize";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "_admin";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "initiateRitual";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "providers";
            readonly type: "address[]";
            readonly internalType: "address[]";
        }, {
            readonly name: "authority";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "duration";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "accessController";
            readonly type: "address";
            readonly internalType: "contract IEncryptionAuthorizer";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
    }, {
        readonly type: "function";
        readonly name: "isEncryptionAuthorized";
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
    }, {
        readonly type: "function";
        readonly name: "isInitiationPublic";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
    }, {
        readonly type: "function";
        readonly name: "isParticipant";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "provider";
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
        readonly name: "isProviderPublicKeySet";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "provider";
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
        readonly name: "isRitualActive";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
    }, {
        readonly type: "function";
        readonly name: "makeInitiationPublic";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "maxDkgSize";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }];
    }, {
        readonly type: "function";
        readonly name: "numberOfRituals";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "owner";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "function";
        readonly name: "pendingDefaultAdmin";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "newAdmin";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "schedule";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
    }, {
        readonly type: "function";
        readonly name: "pendingDefaultAdminDelay";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "newDelay";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "schedule";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
    }, {
        readonly type: "function";
        readonly name: "pendingFees";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "postAggregation";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "aggregatedTranscript";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }, {
            readonly name: "dkgPublicKey";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes16";
                readonly internalType: "bytes16";
            }];
            readonly internalType: "struct BLS12381.G1Point";
        }, {
            readonly name: "decryptionRequestStaticKey";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "postTranscript";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "transcript";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "processPendingFee";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [{
            readonly name: "refundableFee";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "renounceRole";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "revokeRole";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "role";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "rituals";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [{
            readonly name: "initiator";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "initTimestamp";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "endTimestamp";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "totalTranscripts";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "totalAggregations";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "authority";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "dkgSize";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "threshold";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "aggregationMismatch";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "accessController";
            readonly type: "address";
            readonly internalType: "contract IEncryptionAuthorizer";
        }, {
            readonly name: "publicKey";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes16";
                readonly internalType: "bytes16";
            }];
            readonly internalType: "struct BLS12381.G1Point";
        }, {
            readonly name: "aggregatedTranscript";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly type: "function";
        readonly name: "rollbackDefaultAdminDelay";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "setMaxDkgSize";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "newSize";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "setProviderPublicKey";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "publicKey";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "word0";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word1";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "word2";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly internalType: "struct BLS12381.G2Point";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "setReimbursementPool";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "pool";
            readonly type: "address";
            readonly internalType: "contract IReimbursementPool";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "setTimeout";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "newTimeout";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "supportsInterface";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly name: "interfaceId";
            readonly type: "bytes4";
            readonly internalType: "bytes4";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
    }, {
        readonly type: "function";
        readonly name: "timeout";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }];
    }, {
        readonly type: "function";
        readonly name: "totalPendingFees";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "function";
        readonly name: "transferRitualAuthority";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "ritualId";
            readonly type: "uint32";
            readonly internalType: "uint32";
        }, {
            readonly name: "newAuthority";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "withdrawTokens";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "contract IERC20";
        }, {
            readonly name: "amount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [];
    }];
    static createInterface(): CoordinatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Coordinator;
}
