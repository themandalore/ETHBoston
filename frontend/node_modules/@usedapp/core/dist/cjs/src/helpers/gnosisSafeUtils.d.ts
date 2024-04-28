import { TransactionResponse, TransactionReceipt, TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber, BigNumberish, Contract } from 'ethers';
export declare const GNOSIS_SAFE_ABI: string[];
interface MetaTransaction {
    to: string;
    value: string | number | BigNumber;
    data: string;
    operation: number;
}
export interface SafeTransaction extends MetaTransaction {
    safeTxGas: string | number;
    baseGas: string | number;
    gasPrice: string | number;
    gasToken: string;
    refundReceiver: string;
    nonce: string | number;
}
export declare const buildSafeTransaction: (template: {
    to: string;
    value?: BigNumber | number | string;
    data?: string;
    operation?: number;
    safeTxGas?: number | string;
    baseGas?: number | string;
    gasPrice?: number | string;
    gasToken?: string;
    refundReceiver?: string;
    nonce?: number;
}) => SafeTransaction;
export declare const sanitizeTransactionRequest: (transactionRequest: TransactionRequest) => TransactionRequest;
export declare const calculateSafeTransactionHash: (safe: Contract, safeTx: SafeTransaction, chainId: BigNumberish) => string;
export declare const getLatestNonce: (chainId: number, safeAddress: string) => Promise<number | null | undefined>;
export declare const waitForSafeTransaction: (transactionPromise: Promise<TransactionResponse>, contract: Contract, chainId: number, safeTx: SafeTransaction) => Promise<{
    transaction: TransactionResponse;
    receipt: TransactionReceipt;
    rejected: boolean;
}>;
export {};
//# sourceMappingURL=gnosisSafeUtils.d.ts.map