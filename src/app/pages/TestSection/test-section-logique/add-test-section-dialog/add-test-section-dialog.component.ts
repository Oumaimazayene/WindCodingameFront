import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TestSectionLogique } from "src/app/Models/TestSectionLogique";

@Component({
  selector: "app-add-test-section-dialog",
  templateUrl: "./add-test-section-dialog.component.html",
  styleUrls: ["./add-test-section-dialog.component.scss"],
})
export class AddTestSectionDialogComponent implements OnInit {
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  newTestSection: TestSectionLogique = {};

  constructor(
    private dialogRef: MatDialogRef<AddTestSectionDialogComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  closeDialog(): void {
    this.dialogRef.close();
  }
  createTestSection(testSectionForm: NgForm): void {
    if (testSectionForm.valid) {
      this.dialogRef.close(this.newTestSection);
      this.toastr.success("Test créé avec succès.");
    } else {
    }
  }
}
