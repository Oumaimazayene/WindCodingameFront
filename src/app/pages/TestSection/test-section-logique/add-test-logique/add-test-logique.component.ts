import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TestService } from "src/app/service/test-service/test.service";
import { TestSectionLogiqueService } from "src/app/service/testSection_logique-service/test-section-logique-service.service";

@Component({
  selector: "app-add-test-logique",
  templateUrl: "./add-test-logique.component.html",
  styleUrls: ["./add-test-logique.component.scss"],
})
export class AddTestLogiqueComponent implements OnInit {
  newTestLogForm: FormGroup;
  testSectionUUID: string;
  successMessage: string = "";
  testSection: any = {};
  qtsNumber: number;
  errorMessage: string = "";

  constructor(
    private dialogRef: MatDialogRef<AddTestLogiqueComponent>,
    private formBuilder: FormBuilder,
    private TestSectionLogiqueService: TestSectionLogiqueService,
    private testService: TestService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.testSectionUUID = data.testSectionUUID;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getTestSection();
  }

  initializeForm(): void {
    this.newTestLogForm = this.formBuilder.group({
      size: ["", [Validators.required, Validators.min(0)]],
      privateqts: ["", [Validators.required, Validators.min(0)]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getTestSection(): void {
    this.TestSectionLogiqueService.getTestSectionByUUID(
      this.testSectionUUID
    ).subscribe(
      (testSection) => {
        if (testSection) {
          this.testSection = testSection;
          console.log("testSection ok ", this.testSection);

          this.qtsNumber = this.testSection.qtsNumber;
        } else {
          console.error(
            "La section de test avec l'UUID spécifié n'a pas été trouvée."
          );
        }
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération de la section de test :",
          error
        );
      }
    );
  }

  onSubmit(): void {
    if (this.newTestLogForm.valid) {
      const { size, privateqts } = this.newTestLogForm.value;
      const totalQuestions = size + privateqts;
      if (totalQuestions > this.qtsNumber) {
        this.errorMessage =
          "Le nombre total de questions dépasse le nombre attendu.";
        return;
      }

      this.testService
        .createTestLog(this.testSectionUUID, size, privateqts)
        .subscribe(
          (data) => {
            console.log(
              "Réponse de l'API après la création du test logique :",
              data
            );
            this.closeDialog();
            this.toastr.success("Test logique créé avec succès.");
          },
          (error) => {
            this.errorMessage =
              "Erreur lors de la création du test logique : " + error.message;
            console.error(
              "Erreur lors de la création du test logique :",
              error
            );
            this.toastr.error(
              "Erreur lors de la création du test logique : " + error.message
            );
          }
        );
    } else {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
    }
  }
}
