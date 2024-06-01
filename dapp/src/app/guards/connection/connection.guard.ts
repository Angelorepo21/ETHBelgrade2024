import { CanMatchFn } from '@angular/router';
import { inject } from "@angular/core";
import { Web3Service } from "../../services/web3/web3.service";

export const connectionGuard: CanMatchFn = (route, segments) => {
  const web3 = inject(Web3Service);
  return web3.connected;
};
