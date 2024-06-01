import { Routes } from '@angular/router';
import { connectionGuard } from "./guards/connection/connection.guard";
import { AppRoutes } from "./constansts/app-routes";
import { StakeComponent } from "./pages/stake/stake.component";
import { ClaimComponent } from "./pages/claim/claim.component";

export const routes: Routes = [{
  path: AppRoutes.DASHBOARD,
  loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
  canMatch: [connectionGuard],
  children: [{
    path: AppRoutes.STAKE,
    loadComponent: () => import('./partials/dialog-entry/dialog-entry.component').then(c => c.DialogEntryComponent),
    data: {component: StakeComponent}
  }, {
    path: AppRoutes.CLAIM,
    loadComponent: () => import('./partials/dialog-entry/dialog-entry.component').then(c => c.DialogEntryComponent),
    data: {component: ClaimComponent}
  }]
}, {
  path: AppRoutes.CONNECT_WALLET,
  loadComponent: () => import('./pages/connect-wallet/connect-wallet.component').then(c => c.ConnectWalletComponent),
}, {
  path: '**',
  redirectTo: AppRoutes.DASHBOARD,
}];
