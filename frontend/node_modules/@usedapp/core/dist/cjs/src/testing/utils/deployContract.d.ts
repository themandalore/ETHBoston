import { Signer } from 'ethers';
export interface ContractDeclaration {
    abi: any;
    bytecode: string;
}
export declare const deployContract: (deployer: Signer, { abi, bytecode }: ContractDeclaration, args?: any[]) => Promise<import("ethers").Contract>;
//# sourceMappingURL=deployContract.d.ts.map