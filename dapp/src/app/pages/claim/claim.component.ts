import { Component, inject } from '@angular/core';
import { FieldErrorPipe } from "../../pipes/field-error/field-error.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { Router, RouterLink } from "@angular/router";
import { AssetOperation } from "../../partials/asset-operation";
import { PortfolioService } from "../../services/portfolio/portfolio.service";
import { DigitOnlyModule } from "@uiowa/digit-only";
import { AppRoutes } from "../../constansts/app-routes";

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [
    FieldErrorPipe,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    RouterLink,
    DigitOnlyModule
  ],
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.scss'
})
export class ClaimComponent extends AssetOperation {
  private service: PortfolioService = inject(PortfolioService);
  private router = inject(Router);

  processing = false;

  async claim(): Promise<void> {
    this.processing = true;
    const data = this.form.value;

    try {
      await this.service.claim(data);
      await this.router.navigate(['/', AppRoutes.DASHBOARD]);
    } finally {
      this.processing = false;
    }
  }
}
