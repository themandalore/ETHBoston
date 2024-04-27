import { DkgPublicKey, ThresholdMessageKit } from '@nucypher/nucypher-core';
import { Domain } from '@nucypher/shared';
import { ethers } from 'ethers';
import { ConditionExpression } from './conditions/condition-expr';
import { CustomContextParam } from './conditions/context';
export declare const encryptMessage: (plaintext: Uint8Array | string, encryptingKey: DkgPublicKey, conditions: ConditionExpression, authSigner: ethers.Signer) => Promise<ThresholdMessageKit>;
export declare const retrieveAndDecrypt: (provider: ethers.providers.Provider, domain: Domain, porterUri: string, thresholdMessageKit: ThresholdMessageKit, ritualId: number, sharesNum: number, threshold: number, signer?: ethers.Signer, customParameters?: Record<string, CustomContextParam>) => Promise<Uint8Array>;
