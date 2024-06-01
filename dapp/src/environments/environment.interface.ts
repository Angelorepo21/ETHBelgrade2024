import { SupportedCains } from "../app/types/chain";

export interface Environment {
  chainId: SupportedCains;
  contractAddress: string;
}
