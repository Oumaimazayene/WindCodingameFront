import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DomainsService } from "../../../../service/domain-service/domains.service";
import { TypeService } from "../../../../service/type-service/type.service";
import { Domaine } from "src/app/Models/domaine";
import { Type } from "src/app/Models/type";
import { questionTech } from "src/app/Models/questionTech";

export interface Answer {
  id: number;
  answer: string;
  isTrue: boolean;
}

@Component({
  selector: "app-add-question-tech-dialog",
  templateUrl: "./add-question-tech-dialog.component.html",
  styleUrls: ["./add-question-tech-dialog.component.scss"],
})
export class AddQuestionTechDialogComponent implements OnInit {
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  showAnswersInput = false;
  newAnswer: string = "";
  submittedAnswers: string[] = [];
  selectedDifficulty: string;
  newQuestion: questionTech = {
    title: "",
    questionBody: "",
    score: 0,
    difficulty: "",
    time: 0,
    isPrivate: false,
    type_id: 0,
    answer: [],
    id: 0,
    domain_id: 0,
  };

  domaines: Domaine[];
  types: Type[];

  constructor(
    private domainsService: DomainsService,
    private typeService: TypeService,
    public dialogRef: MatDialogRef<AddQuestionTechDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadDomaines();
    this.loadTypes();
    this.selectedDifficulty = this.difficulties[0];
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

  addQuestion(questionForm: NgForm): void {
    if (questionForm.valid) {
      this.dialogRef.close(this.newQuestion);
    } else {
    }
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

  updateDomainId(domainId: number) {
    this.newQuestion.domain_id = domainId;
  }

  updateTypeId(typeId: number) {
    this.newQuestion.type_id = typeId;
  }
}
