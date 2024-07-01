import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-validation",
  templateUrl: "./confirm-validation.component.html",
  styleUrls: ["./confirm-validation.component.scss"],
})
export class ConfirmValidationComponent implements OnInit {
  userId: number;
  isLoading: boolean = false;
  validationError: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmValidationComponent>
  ) {
    this.userId = data.userId;
  }

  ngOnInit(): void {}
  onConfirm(): void {
    this.isLoading = true;

    this.data.validateUser(this.userId).subscribe(
      () => {
        console.log("Validation réussie");
        this.dialogRef.close(true);
      },
      (error) => {
        console.error("Erreur lors de la validation de l'utilisateur :", error);
      }
    );
  }
}
