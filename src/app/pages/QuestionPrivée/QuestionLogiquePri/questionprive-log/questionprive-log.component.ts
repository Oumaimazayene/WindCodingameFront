import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestSectionLogiqueService } from "src/app/service/testSection_logique-service/test-section-logique-service.service";
import { questionLog } from "src/app/Models/questionLog";
import { QuestionLogicService } from "src/app/service/question-logique/questions-logique.service";
import { ViewQuestionLogDialogComponent } from "src/app/pages/Question/questions-log/view-question-log-dialog/view-question-log-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddQuestionPriveeLogDialogComponent } from "../add-question-privee-log-dialog/add-question-privee-log-dialog.component";
import { AddQuestionLogDialogComponent } from "../../../Question/questions-log/add-question-log-dialog/add-question-log-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-questionprive-log",
  templateUrl: "./questionprive-log.component.html",
  styleUrls: ["./questionprive-log.component.scss"],
})
export class QuestionpriveLogComponent implements OnInit {
  privateQuestions: questionLog[];
  testSectionId: number;
  newQuestion: questionLog = {};
  constructor(
    private testSectionLogiqueService: TestSectionLogiqueService,
    private route: ActivatedRoute,
    private questionLogicService: QuestionLogicService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.testSectionId = +params.get("id");
      console.log("id", this.testSectionId);
      this.getPrivateQuestions(this.testSectionId);
    });
  }

  getPrivateQuestions(testSectionId: number): void {
    this.testSectionLogiqueService
      .getPrivateQuestionsByTestSectionId(testSectionId)
      .subscribe((privateQuestions) => {
        this.privateQuestions = privateQuestions;
      });
  }

  openViewQuestionDialog(id: number): void {
    this.questionLogicService.getQuestionLogiqueById(id).subscribe(
      (question) => {
        const dialogRef = this.dialog.open(ViewQuestionLogDialogComponent, {
          data: question,
          maxHeight: "80vh",
          maxWidth: "80vw",
          height: "80%",
          width: "80%",
          panelClass: "centered-dialog",
        });

        dialogRef.afterClosed().subscribe(() => {});
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des détails de la question : ",
          error
        );
      }
    );
  }

  openAddQuestionLogDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionPriveeLogDialogComponent, {
      data: { testSectionId: this.testSectionId },
    });
    dialogRef.afterClosed().subscribe((formData: { imageFile: File }) => {
      if (formData) {
        this.route.paramMap.subscribe((params) => {
          if (this.testSectionId !== null) {
            const questionLogicDtoJson = JSON.stringify(this.newQuestion);
            this.addQuestion(
              this.testSectionId,
              formData.imageFile,
              questionLogicDtoJson
            );
            this.getPrivateQuestions(this.testSectionId);

            this.toastr.success("Question privée créer avec succés ");
          } else {
            console.error("ID de la section de test non trouvé dans l'URL.");
            this.toastr.error(
              "erreur lors de création de question privée essayer une autre fois"
            );
          }
        });
      }
    });
  }

  addQuestion(
    testSectionId: number,
    imageFile: File,
    questionLogicDtoJson: string
  ): void {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("questionLogicDtoJson", questionLogicDtoJson);

    this.testSectionLogiqueService
      .createPrivateQuestionLogique(testSectionId, formData)
      .subscribe(
        (response) => {
          console.log(
            "Réponse de la création de la question privée:",
            response
          );
          this.getPrivateQuestions(testSectionId);
        },
        (error) => {
          console.error(
            "Erreur lors de la création de la question privée:",
            error
          );
        }
      );
  }
}
