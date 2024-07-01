import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-type-dialog",
  templateUrl: "./delete-type-dialog.component.html",
  styleUrls: ["./delete-type-dialog.component.scss"],
})
export class DeleteTypeDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteTypeDialogComponent>) {}
  ngOnInit(): void {}
  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
