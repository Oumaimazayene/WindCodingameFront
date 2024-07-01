import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Domaine } from "src/app/Models/domaine";
import { questionTech } from "src/app/Models/questionTech";
import { Type } from "src/app/Models/type";
import { DomainsService } from "src/app/service/domain-service/domains.service";
import { TypeService } from "src/app/service/type-service/type.service";

@Component({
  selector: "app-addquestion-tech-prive",
  templateUrl: "./addquestion-tech-prive.component.html",
  styleUrls: ["./addquestion-tech-prive.component.scss"],
})
export class AddquestionTechPriveComponent implements OnInit {
  showSecondStep: boolean = false;
  domaines: Domaine[];
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  showAnswersInput = false;
  newAnswer: string = "";
  submittedAnswers: string[] = [];
  selectedDifficulty: string;
  newQuestion: questionTech = {
    title: "",
    questionBody: "",
    difficulty: "",
    score: 0,
    domain_id: 0,
    type_id: 0,
    time: 0,
    answer: [],
  };
  types: Type[];
  testSectionId: number;

  constructor(
    private typeService: TypeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddquestionTechPriveComponent>,
    private domainsService: DomainsService
  ) {}

  ngOnInit(): void {
    this.loadDomaines();
    this.loadTypes();
    this.selectedDifficulty = this.difficulties[0];
    if (this.data && this.data.testSectionId) {
      this.testSectionId = this.data.testSectionId;
      console.log("testsectioid", this.testSectionId);
    } else {
      console.error("ID de la section de test non trouvé dans les données.");
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadTypes(): void {
    this.typeService.getAllTypes().subscribe(
      (types: Type[]) => {
        this.types = types;
        console.log(types);
      },
      (error) => {
        console.error("Erreur lors du chargement des types :", error);
      }
    );
  }
  goToSecondStep(stepper: any) {
    stepper.next();
  }

  showAnswersSection() {
    this.showAnswersInput = true;
  }

  submitAndAddAnswer(): void {
    if (this.newAnswer.trim() !== "") {
      this.submittedAnswers.push(this.newAnswer);
      this.newQuestion.answer.push({
        id: 0,
        answer: this.newAnswer,
        isTrue: false,
      });
      this.newAnswer = "";
    }
  }
  removeAnswer(index: number): void {
    this.submittedAnswers.splice(index, 1);

    this.newQuestion.answer.splice(index, 1);
  }

  updateTypeId(typeId: string | number) {
    if (typeof typeId === "string") {
      this.newQuestion.type_id = parseInt(typeId, 10);
    } else {
      this.newQuestion.type_id = typeId;
    }
    console.log("Type ID selected:", this.newQuestion.type_id);
  }

  updateDomainId(domainId: number) {
    this.newQuestion.domain_id = domainId;
  }

  loadDomaines(): void {
    this.domainsService.getAllDomaines().subscribe(
      (domaines: Domaine[]) => {
        this.domaines = domaines;
        console.log("domaines", domaines);
      },
      (error) => {
        console.error("Erreur lors du chargement des domaines :", error);
      }
    );
  }

  addQuestion(questionForm: NgForm): void {
    if (questionForm.valid) {
      this.dialogRef.close(this.newQuestion);
    } else {
    }
  }
}
