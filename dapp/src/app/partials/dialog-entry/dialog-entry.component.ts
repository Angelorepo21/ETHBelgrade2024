import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";

@Component({
  selector: 'app-dialog-entry',
  standalone: true,
  imports: [],
  template: '',
})
export class DialogEntryComponent implements OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private dialog: MatDialog = inject(MatDialog);

  private ref!: MatDialogRef<DialogEntryComponent>;

  constructor() {
    const { component } = this.route.snapshot.data;

    if (!component) {
      throw new Error('Component should be set up in route data');
    }

    this.openDialog(component);
  }

  openDialog(component: ComponentType<any>): void {
    let config: any = {
      width: '460px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      closeOnNavigation: true,
      disableClose: true,
    };

    const { componentData, dialogConfig } = this.route.snapshot.data;

    if (componentData) {
      config.data = componentData;
    }

    if (dialogConfig) {
      config = Object.assign(config, dialogConfig);
    }

    this.ref = this.dialog.open(component,  config);
  }

  ngOnDestroy(): void {
    this.ref.close();
  }
}
