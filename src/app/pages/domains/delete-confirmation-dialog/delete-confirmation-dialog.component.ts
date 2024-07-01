import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-confirmation-dialog",
  templateUrl: "./delete-confirmation-dialog.component.html",
  styleUrls: ["./delete-confirmation-dialog.component.scss"],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  confirmDelete(): void {
    this.dialogRef.close(true); 
    this.showSuccessAlert();
  }

  // Cette méthode est appelée lorsque la boîte de dialogue est fermée
  onDialogClose(): void {
    // Fermer l'alerte de succès si elle est encore affichée
    this.hideSuccessAlert();
  }

  // Afficher l'alerte de succès pendant 15 secondes
  private showSuccessAlert(): void {
    const successAlert = document.getElementById("successAlert");
    if (successAlert) {
      successAlert.style.display = "block";
      setTimeout(() => {
        this.hideSuccessAlert(); // Masquer l'alerte après 15 secondes
      }, 15000); // 15 secondes
    }
  }

  public hideSuccessAlert(): void {
    const successAlert = document.getElementById("successAlert");
    if (successAlert) {
      successAlert.style.display = "none";
    }
  }
}
