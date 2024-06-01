import { ChainConfig, SupportedCains } from "../types/chain";

export const chainConfig: Record<SupportedCains, ChainConfig> = {
  '0x38': {
    chainId: '0x38',
    chainName: 'BNB Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-rpc.publicnode.com'],
    blockExplorerUrls: ['https://bscscan.com/'],
  }
};
