import { Component, Inject, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-update-confirmation-dialog",
  templateUrl: "./update-confirmation-dialog.component.html",
  styleUrls: ["./update-confirmation-dialog.component.scss"],
})
export class UpdateConfirmationDialogComponent {
  @ViewChild("domainForm") domainForm!: NgForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateConfirmationDialogComponent>
  ) {}

  updateDomain(domainForm: NgForm): void {
    if (domainForm.valid) {
      this.dialogRef.close(this.data);
    } else {
    }
  }

  closeDialog() {
    // Fermer le dialogue sans enregistrer les modifications
    this.dialogRef.close();
  }
}
