import { BigNumber, BigNumberish } from "ethers";
import { ethers, network } from "hardhat";
import { IERC20, IERC20__factory } from "../../typechain";
import { BigFromN } from "./stringn";

export const stealMoney = async (
  from: string,
  to: string,
  tokenAddr: string,
  amount: BigNumberish
) => {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [from],
  });
  const robberee = ethers.provider.getSigner(from);
  const money = IERC20__factory.connect(tokenAddr, robberee);
  await money.transfer(to, BigFromN(amount));
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [from],
  });
  return;
};

export const approveMoney = async (
  from: string,
  to: string,
  tokenAddr: string,
  amount: BigNumberish
) => {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [from],
  });
  const robberee = await ethers.getSigner(from);
  const money = IERC20__factory.connect(tokenAddr, robberee);
  await money.approve(to, BigFromN(amount));
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [from],
  });
  return;
};

export const getMoney = async (
  from: string,
  tokenAddr: string
): Promise<BigNumber> => {
  const signer = await ethers.getSigner(from);
  const money = IERC20__factory.connect(tokenAddr, signer);
  return money.balanceOf(from);
};
