import { constants } from 'ethers';
export const mineBlock = async (wallet) => {
    const tx = await wallet.sendTransaction({ to: constants.AddressZero, value: 0 });
    await tx.wait();
};
//# sourceMappingURL=mineBlock.js.map