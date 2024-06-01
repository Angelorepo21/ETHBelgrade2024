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
import { RouterLink } from "@angular/router";
import { AssetOperation } from "../../partials/asset-operation";
import { PortfolioService } from "../../services/portfolio/portfolio.service";
import { DigitOnlyModule } from "@uiowa/digit-only";

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

  async claim(): Promise<void> {
    const data = this.form.value;
    await this.service.claim(data);
  }
}
