export type SupportedCains = '0x38';

export interface ChainConfig {
  chainId: SupportedCains;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  }
  rpcUrls: string[];
  blockExplorerUrls: string[];
}
