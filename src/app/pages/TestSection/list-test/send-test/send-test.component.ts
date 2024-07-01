import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CandidatServiceService } from "src/app/service/candidat-service/candidat-service.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-send-test",
  templateUrl: "./send-test.component.html",
  styleUrls: ["./send-test.component.scss"],
})
export class SendTestComponent implements OnInit {
  emailData: any = {};
  formValid: boolean = false;
  testUrl: string = "";
  emailBody: string = "";
  showAlert: boolean = false;

  sendTestForm = new FormGroup({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(
    public dialogRef: MatDialogRef<SendTestComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private candidatService: CandidatServiceService
  ) {}
  ngOnInit(): void {
    this.emailData.testId = this.data.testId;

    this.testUrl = `http://localhost:4200/#/test/start/${this.emailData.testId}`;
    // this.testUrl =
    //   "http://localhost:4200/#/test/start/${this.emailData.testId}";
    this.emailBody = `Bonjour,\n\nVoici le lien vers le test : ${this.testUrl}\n\n`;
    this.emailBody += `L'ID du test est : ${this.emailData.testId}\n\nCordialement,`;

    this.sendTestForm.valueChanges.subscribe(() => {
      this.formValid = this.sendTestForm.valid;
      this.emailData.candidatEmail = this.sendTestForm.get("email").value;
      this.emailData.firstName = this.sendTestForm.get("firstname").value;
      this.emailData.lastName = this.sendTestForm.get("lastname").value;
    });
  }
  sendEmail(): void {
    console.log("Données du formulaire :", this.sendTestForm.value);
    console.log("E-mail du candidat :", this.emailData.candidatEmail);
    console.log("Prénom du candidat :", this.emailData.firstName);
    console.log("Nom du candidat :", this.emailData.lastName);
    console.log("Corps de l'e-mail :", this.emailBody);

    this.candidatService
      .sendEmailToCandidate(
        this.emailData.testId,
        this.emailData.candidatEmail,
        this.emailData.firstName,
        this.emailData.lastName
      )
      .subscribe(
        (response) => {
          console.log("Réponse de l'API :", response);
          console.log("E-mail envoyé avec succès !");
          this.closeDialog();
          this.toastr.success("Test envoyé avec succés ");
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
          console.error("Détails de l'erreur :", error.error);
          this.toastr.error("Erreur lors de l'envoi de l'e-mail");
        }
      );
  }
  closeDialog(): void {
    this.sendTestForm.reset();
    this.dialogRef.close();
  }
}
