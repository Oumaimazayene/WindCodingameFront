import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { questionLog } from "src/app/Models/questionLog";
import { Type } from "src/app/Models/type";
import { TypeService } from "src/app/service/type-service/type.service";
import { QuestionLogicService } from "src/app/service/question-logique/questions-logique.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-question-log-dialog",
  templateUrl: "./add-question-log-dialog.component.html",
  styleUrls: ["./add-question-log-dialog.component.scss"],
})
export class AddQuestionLogDialogComponent implements OnInit {
  showSecondStep: boolean = false;
  questionsLogiques: any[] = [];

  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  showAnswersInput = false;
  newAnswer: string = "";
  submittedAnswers: string[] = [];
  selectedDifficulty: string;
  newQuestion: questionLog = {
    title: "",
    questionBody: "",
    score: 0,
    difficulty: "",
    time: 0,
    isPrivate: false,
    type_id: 0,
    answer: [],
    urlimage: "",
  };

  imageFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  types: Type[];

  constructor(
    public dialogRef: MatDialogRef<AddQuestionLogDialogComponent>,
    private typeService: TypeService,
    private questionLogService: QuestionLogicService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTypes();
    this.selectedDifficulty = this.difficulties[0];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  goToSecondStep(stepper: any) {
    stepper.next();
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

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imageFile = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  addQuestion(): void {
    if (!this.imageFile) {
      console.error("Aucun fichier image sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", this.imageFile);
    formData.append("questionLogiqueDtoJson", JSON.stringify(this.newQuestion));

    this.questionLogService.addQuestionLogic(formData).subscribe(
      (response) => {
        console.log("Question ajoutée avec succès :", response);
        this.toastr.success("Question logique ajoutée avec succès");

        this.dialogRef.close(this.newQuestion);
        this.questionLogService.getAll();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la question :", error);
        this.toastr.success("Question logique ajoutée avec succès");
      }
    );
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
      this.newQuestion.type_id = parseInt(typeId, 10); // Conversion en nombre
    } else {
      this.newQuestion.type_id = typeId;
    }
    console.log("Type ID selected:", this.newQuestion.type_id);
  }

  getImgUrl(file: File): string {
    return file.webkitRelativePath || "";
  }

  // getAllQuestions(): void {
  //   this.questionLogService.getAll().subscribe(
  //     (questions) => {
  //       this.questionsLogiques = questions;
  //     },
  //     (error) => {
  //       console.error(
  //         "Erreur lors de la récupération de toutes les questions logiques : ",
  //         error
  //       );
  //     }
  //   );
  // }
}
