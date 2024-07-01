import { Component, Inject, OnInit } from "@angular/core";
import { TestSectionLogiqueService } from "src/app/service/testSection_logique-service/test-section-logique-service.service";
import { TypeService } from "src/app/service/type-service/type.service";
import { questionLog } from "src/app/Models/questionLog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Type } from "src/app/Models/type";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-add-question-privee-log-dialog",
  templateUrl: "./add-question-privee-log-dialog.component.html",
  styleUrls: ["./add-question-privee-log-dialog.component.scss"],
})
export class AddQuestionPriveeLogDialogComponent implements OnInit {
  showSecondStep: boolean = false;
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
  privateQuestions: questionLog[];

  imageFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  types: Type[];
  testSectionId: number;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionPriveeLogDialogComponent>,
    private typeService: TypeService,
    private testtLogiqueService: TestSectionLogiqueService,
    private toastr: ToastrService,
    private testSectionLogiqueService: TestSectionLogiqueService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
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
  getPrivateQuestions(testSectionId: number): void {
    this.testSectionLogiqueService
      .getPrivateQuestionsByTestSectionId(testSectionId)
      .subscribe((privateQuestions) => {
        this.privateQuestions = privateQuestions;
      });
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

  addQuestion(): void {
    if (!this.imageFile) {
      console.error("Aucun fichier image sélectionné.");
      return;
    }

    if (
      !this.newQuestion.title ||
      !this.newQuestion.questionBody ||
      !this.newQuestion.difficulty
    ) {
      console.error("Veuillez remplir tous les champs requis.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", this.imageFile);
    formData.append("questionLogiqueDtoJson", JSON.stringify(this.newQuestion));
    console.log("qqq", this.newQuestion);

    this.testtLogiqueService
      .createPrivateQuestionLogique(this.testSectionId, formData)
      .subscribe(
        (response) => {
          console.log("Question ajoutée avec succès :", response);
          this.toastr.success("Question logique ajoutée avec succès");
          this.getPrivateQuestions(this.data.testSectionId);
          this.dialogRef.close();
        },
        (error) => {
          console.error("Erreur lors de l'ajout de la question :", error);
        }
      );
  }

  getImgUrl(file: File): string {
    return file.webkitRelativePath || "";
  }
}
