import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-update-type-dialog",
  templateUrl: "./update-type-dialog.component.html",
  styleUrls: ["./update-type-dialog.component.scss"],
})
export class UpdateTypeDialogComponent implements OnInit {
  @ViewChild("TypeForm") TypeForm!: NgForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateTypeDialogComponent>
  ) {}

  updateType(TypeForm: NgForm): void {
    if (TypeForm.valid) {
      const id = this.data.id;
      const updatedType = TypeForm.value;
      this.dialogRef.close({ id, updatedType });
    } else {
    }
  }

  closeDialog() {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
