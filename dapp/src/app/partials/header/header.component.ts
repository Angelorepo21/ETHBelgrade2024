import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { UserIconPipe } from "../../pipes/user-icon/user-icon.pipe";
import { WalletAddressPipe } from "../../pipes/wallet-address/wallet-address.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatToolbar,
    UserIconPipe,
    WalletAddressPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() address: string | null = null;
}
