import { network } from "hardhat";

export class Impersonator {
  readonly address: string;
  constructor(a: string) {
    this.address = a;
  }

  async start(): Promise<Impersonator> {
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [this.address],
    });
    return this;
  }

  async stop(): Promise<Impersonator> {
    await network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [this.address],
    });
    return this;
  }
}

export const Impersonate = async (address: string): Promise<Impersonator> => {
  const o = new Impersonator(address);
  return o.start();
};
