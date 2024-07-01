import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Domaine } from "src/app/Models/domaine";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-ajout-confirmation-dialog",
  templateUrl: "./ajout-confirmation-dialog.component.html",
  styleUrls: ["./ajout-confirmation-dialog.component.scss"],
})
export class AjoutConfirmationDialogComponent implements OnInit {
  @ViewChild("snackBarTemplate") snackBarTemplate: TemplateRef<any>;
  newDomaine: Domaine = {
    name: "",
    version: "",
    lang: "",
  };

  constructor(
    private dialogRef: MatDialogRef<AjoutConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addDomaine(domainForm: NgForm): void {
    if (domainForm.valid) {
      this.dialogRef.close(this.newDomaine);
    } else {
    }
  }
}
