import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Domaine } from "src/app/Models/domaine";
import { TestSectionTech } from "src/app/Models/testSection-Tech";
import { DomainsService } from "src/app/service/domain-service/domains.service";
import { TestSectionTechServiceService } from "../../../../service/TestSection-Tech-Service/test-section-tech-service.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-test-section-tech-dialog",
  templateUrl: "./add-test-section-tech-dialog.component.html",
  styleUrls: ["./add-test-section-tech-dialog.component.scss"],
})
export class AddTestSectionTechDialogComponent implements OnInit {
  newTestSection: TestSectionTech = {};
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  selectedDifficulty: string = "";
  selectedDifficulties: string[] = [];
  selectedDomains: string[] = [];
  domaines: Domaine[] = [];
  selectedDomaine: Domaine | null = null;
  newQuestionNumber: number | undefined;
  newprivateQuestion: number | undefined;
  showErrorMessage: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddTestSectionTechDialogComponent>,
    private domaineService: DomainsService,
    private TestSectionTechServiceService: TestSectionTechServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDomaines();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  createTestSection(testSectionForm: NgForm): void {
    if (testSectionForm.valid) {
      const sum =
        (this.newTestSection.publicNumber?.reduce((a, b) => a + b, 0) || 0) +
        (this.newTestSection.privateNumber?.reduce((a, b) => a + b, 0) || 0);

      if (sum > this.newTestSection.qtsNumber) {
        this.showErrorMessage = true;
      } else {
        this.showErrorMessage = false; // Assurez-vous de réinitialiser la variable en cas de soumission réussie
        this.dialogRef.close(this.newTestSection);
        console.log("ajout", this.newTestSection);
        this.toastr.success("Section de test créée avec succès");
        this.TestSectionTechServiceService.getTestSectionsByUserUUID;
      }
    }
  }

  onDifficultySelect(): void {
    if (!this.newTestSection.difficulties) {
      this.newTestSection.difficulties = [];
    }

    if (this.selectedDifficulty) {
      this.selectedDifficulties.push(this.selectedDifficulty);
      this.newTestSection.difficulties.push(this.selectedDifficulty);
      this.selectedDifficulty = "";
    }
  }

  getAllDomaines(): void {
    this.domaineService.getAllDomaines().subscribe((domaines) => {
      this.domaines = domaines;
      console.log("domaines", domaines);
    });
  }
  onDomainSelect(): void {
    if (!this.newTestSection.domain_id) {
      this.newTestSection.domain_id = [];
    }

    if (this.selectedDomaine) {
      this.selectedDomains.push(this.selectedDomaine.name);
      if (this.selectedDomaine.id) {
        this.newTestSection.domain_id.push(this.selectedDomaine.id);
        console.log("domaineselectionner", this.newTestSection.domain_id);
      }
      console.log("Domaine sélectionné :", this.selectedDomaine);
    }
  }

  addPublicQuestionNumber(): void {
    if (this.newQuestionNumber !== undefined) {
      if (!this.newTestSection.publicNumber) {
        this.newTestSection.publicNumber = [];
      }
      this.newTestSection.publicNumber.push(this.newQuestionNumber);
      this.newQuestionNumber = undefined;
    }
  }
  addPrivateQuestionNumber(): void {
    if (this.newprivateQuestion !== undefined) {
      if (!this.newTestSection.privateNumber) {
        this.newTestSection.privateNumber = [];
      }
      this.newTestSection.privateNumber.push(this.newprivateQuestion);
      this.newprivateQuestion = undefined;
    }
  }
}
