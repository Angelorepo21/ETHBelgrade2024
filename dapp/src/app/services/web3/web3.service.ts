import { Injectable } from '@angular/core';
import { BrowserProvider } from "ethers";
import { MetaMaskSDK } from "@metamask/sdk";
import { chainConfig } from "../../constansts/chain-config";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private _sdk: MetaMaskSDK;
  private _provider: BrowserProvider | null = null;

  get connected(): boolean {
    return this._provider !== null;
  }

  get provider(): BrowserProvider {
    if (!this._provider) {
      throw new Error('Not connected to Web3');
    }

    return this._provider;
  }

  constructor() {
    this._sdk = new MetaMaskSDK({
      dappMetadata: {
        name: 'GG Fund',
        url: window.location.href
      }
    });

    const ethereum = this._sdk.getProvider();
  }

  async connect() {
    const ethereum = this._sdk.getProvider();

    if (!ethereum) {
      throw new Error('MetaMask not installed');
    }

    await ethereum.request({ method: "eth_requestAccounts", params: [] });

    try {
      await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: '0x38' }] });
    } catch (err: any) {
      if ('code' in err && err.code === 4902) {
        const config = chainConfig[environment.chainId];

        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [config],
        });
      }
    }

    this._provider = new BrowserProvider(ethereum);

    return this._provider;
  }

  async getAddress(): Promise<string> {
    const signer = await this.provider.getSigner();
    return await signer.getAddress();
  }
}
