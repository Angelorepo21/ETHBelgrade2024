import { Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { Web3Service } from "../../services/web3/web3.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-connect-wallet',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './connect-wallet.component.html',
  styleUrl: './connect-wallet.component.scss'
})
export class ConnectWalletComponent {
  private web3 = inject(Web3Service);
  private router = inject(Router);

  async connect(): Promise<void> {
    await this.web3.connect();
    await this.router.navigate(['.'], {onSameUrlNavigation: 'reload'});
  }
}
