import { inject, Injectable } from '@angular/core';
import { Web3Service } from "../web3/web3.service";
import { Contract, formatEther, parseUnits } from "ethers";
import { environment } from "../../../environments/environment";
import { Abi, Erc20Abi } from "../../constansts/abi";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private web3: Web3Service = inject(Web3Service);
  private readonly contract: Contract;

  protected readonly contractAddress: string = environment.contractAddress;
  protected readonly abi: string[] = Abi;

  constructor() {
    const provider = this.web3.provider;
    this.contract = new Contract(this.contractAddress, this.abi, provider);
  }

  async getPortfolioValue(): Promise<string> {
    const value = await this.contract['calculatePortfolioValue']();
    return formatEther(value);
  }

  async getTokenValue(): Promise<string> {
    const value = await this.contract['tokenValue']();
    return formatEther(value);
  }

  async getGGBalance(): Promise<string> {
    const signer = await this.web3.provider.getSigner();
    const balance = await this.contract['balanceOf'](await signer.getAddress());
    return formatEther(balance);
  }

  async stake(token: {address: string, amount: number }): Promise<void> {
    const tokenContract = new Contract(token.address, Erc20Abi, await this.web3.provider.getSigner());
    const decimals = await tokenContract['decimals']();
    const amount = parseUnits(token.amount.toString(), decimals);

    const approve = await tokenContract['approve'](this.contractAddress, amount);
    await approve.wait();

    const stake = await this.contract['stakeToken'](token.address, amount);
    await stake.wait();
  }

  async claim(token: {address: string, amount: number }): Promise<void> {
    const tokenContract = new Contract(token.address, Erc20Abi, await this.web3.provider.getSigner());
    const decimals = await tokenContract['decimals']();
    const amount = parseUnits(token.amount.toString(), decimals);

    const claim = await this.contract['claimToken'](token.address, amount);
    await claim.wait();
  }
}
