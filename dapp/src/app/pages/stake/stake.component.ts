import { Component, inject } from '@angular/core';
import { AssetOperation } from "../../partials/asset-operation";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatButton, MatIconButton } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { FieldErrorPipe } from "../../pipes/field-error/field-error.pipe";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { PortfolioService } from "../../services/portfolio/portfolio.service";
import { DigitOnlyModule } from "@uiowa/digit-only";

@Component({
  selector: 'app-stake',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    FieldErrorPipe,
    MatInput,
    MatError,
    MatLabel,
    MatSelect,
    MatOption,
    MatIconButton,
    MatIcon,
    RouterLink,
    DigitOnlyModule,
  ],
  templateUrl: './stake.component.html',
  styleUrl: './stake.component.scss'
})
export class StakeComponent extends AssetOperation {
  private service: PortfolioService = inject(PortfolioService);

  async stake(): Promise<void> {
    const data = this.form.value;
    await this.service.stake(data);
  }
}
