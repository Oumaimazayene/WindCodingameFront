import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-question-tech-dialog",
  templateUrl: "./delete-question-tech-dialog.component.html",
  styleUrls: ["./delete-question-tech-dialog.component.scss"],
})
export class DeleteQuestionTechDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteQuestionTechDialogComponent>
  ) {}

  ngOnInit(): void {}

  confirmAction(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}
