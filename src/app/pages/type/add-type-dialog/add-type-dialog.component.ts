import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Type } from "src/app/Models/type";

@Component({
  selector: "app-add-type-dialog",
  templateUrl: "./add-type-dialog.component.html",
  styleUrls: ["./add-type-dialog.component.scss"],
})
export class AddTypeDialogComponent implements OnInit {
  newType: Type = new Type();
  constructor(private dialogRef: MatDialogRef<AddTypeDialogComponent>) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  addType(typeForm: NgForm): void {
    if (typeForm.valid) {
      this.dialogRef.close(this.newType);
    } else {
    }
  }
}
