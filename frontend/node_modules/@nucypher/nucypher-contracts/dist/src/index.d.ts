export type Abi = unknown;
export interface DeployedContract {
    address: string;
    abi: Abi;
}
export declare const contractNames: readonly ["Coordinator", "GlobalAllowList", "SubscriptionManager"];
export type ContractName = (typeof contractNames)[number];
export interface Contract {
    name: ContractName;
    abi: Abi;
}
export type ContractRegistry = Record<string, Record<string, DeployedContract>>;
export declare const domainRegistry: Record<string, ContractRegistry>;
export type Domain = "mainnet" | "oryx" | "tapir" | "lynx";
export type ChainId = 1 | 5 | 137 | 80002;
export type ChecksumAddress = `0x${string}`;
export declare const getContract: (domain: Domain | string, chainId: ChainId | number, contract: ContractName | string) => ChecksumAddress;
