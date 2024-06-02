import { inject, Injectable } from '@angular/core';
import { Web3Service } from "../web3/web3.service";
import { Contract, formatEther, parseUnits } from "ethers";
import { environment } from "../../../environments/environment";
import { Abi, Erc20Abi } from "../../constansts/abi";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private web3: Web3Service = inject(Web3Service);
  private snackbar: MatSnackBar = inject(MatSnackBar);
  private _contract!: Contract;

  protected readonly contractAddress: string = environment.contractAddress;
  protected readonly abi: string[] = Abi;

  private async getGGContract(): Promise<Contract> {
    if (this._contract) {
      return this._contract;
    }

    const provider = this.web3.provider;
    this._contract = new Contract(this.contractAddress, this.abi, await provider.getSigner());
    return this._contract;
  }

  async getPortfolioValue(): Promise<string> {
    const contract = await this.getGGContract();
    const value = await contract['calculatePortfolioValue']();
    return formatEther(value);
  }

  async getTokenValue(): Promise<string> {
    const contract = await this.getGGContract();
    const value = await contract['tokenValue']();
    return formatEther(value);
  }

  async getGGBalance(): Promise<string> {
    const signer = await this.web3.provider.getSigner();
    const contract = await this.getGGContract();
    const balance = await contract['balanceOf'](await signer.getAddress());
    return formatEther(balance);
  }

  async stake(token: {address: string, amount: number }): Promise<void> {
    const tokenContract = new Contract(token.address, Erc20Abi, await this.web3.provider.getSigner());
    const decimals = await tokenContract['decimals']();
    const amount = parseUnits(token.amount.toString(), decimals);

    const approve = await tokenContract['approve'](this.contractAddress, amount);
    await approve.wait();

    const contract = await this.getGGContract();

    try {
      const stake = await contract['stakeToken'](token.address, amount);
      await stake.wait();
      this.snackbar.open('Stake successful', 'Ok', { panelClass: 'success-snackbar' })
    } catch (error) {
      // TODO: improve error handling
      const errMsg = 'Stake failed, reload the page and try again.';
      this.snackbar.open(errMsg, 'Ok', { panelClass: 'error-snackbar' });
      throw new Error(errMsg);
    }
  }

  async claim(token: {address: string, amount: number }): Promise<void> {
    const tokenContract = new Contract(token.address, Erc20Abi, await this.web3.provider.getSigner());
    const decimals = await tokenContract['decimals']();
    const amount = parseUnits(token.amount.toString(), decimals);

    const contract = await this.getGGContract();
    try {
      const claim = await contract['claimToken'](token.address, amount);
      await claim.wait();
      this.snackbar.open('Claim successful', 'Ok', { panelClass: 'success-snackbar' })
    } catch (error) {
      // TODO: improve error handling
      const errMsg = 'Claim failed, reload the page and try again.';
      this.snackbar.open(errMsg, 'Ok', { panelClass: 'error-snackbar' });
      throw new Error(errMsg);
    }
  }
}
