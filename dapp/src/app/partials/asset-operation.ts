import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { portfolioTokens } from "../constansts/portfolio-tokens";

export class AssetOperation {
  form: FormGroup;

  readonly assets = portfolioTokens;

  get amountControl(): AbstractControl {
    return this.form.get('amount') as AbstractControl;
  }

  get addressControl(): AbstractControl {
    return this.form.get('address') as AbstractControl;
  }

  constructor() {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }
}
