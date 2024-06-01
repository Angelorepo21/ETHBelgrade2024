import { Component, inject } from '@angular/core';
import { Web3Service } from "../../services/web3/web3.service";
import { FormsModule } from "@angular/forms";
import { PortfolioService } from "../../services/portfolio/portfolio.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { HeaderComponent } from "../../partials/header/header.component";
import { MatAnchor } from "@angular/material/button";
import { AppRoutes } from "../../constansts/app-routes";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AsyncPipe,
    HeaderComponent,
    MatAnchor,
    RouterOutlet,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private portfolio: PortfolioService = inject(PortfolioService);
  private web3: Web3Service = inject(Web3Service);

  readonly address$: Promise<string>;

  readonly stakeUrl = `/${AppRoutes.STAKE}`;
  readonly claimUrl = `/${AppRoutes.CLAIM}`;

  ggBalance$: Promise<string>;
  portfolioValue$: Promise<string>
  tokenValue$: Promise<string>;

  constructor() {
    this.address$ = this.web3.getAddress();

    this.ggBalance$ = this.portfolio.getGGBalance();
    this.portfolioValue$ = this.portfolio.getPortfolioValue();
    this.tokenValue$ = this.portfolio.getTokenValue();
  }
}
