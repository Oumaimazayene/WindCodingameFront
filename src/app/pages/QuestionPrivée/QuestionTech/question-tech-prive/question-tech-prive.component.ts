import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { questionTech } from "src/app/Models/questionTech";
import { TestSectionTechServiceService } from "src/app/service/TestSection-Tech-Service/test-section-tech-service.service";
import { QuestionsTechService } from "../../../../service/question-tech/questions-tech.service";
import { AfficheQuestionTechDialogComponent } from "src/app/pages/Question/questions-tech/affiche-question-tech-dialog/affiche-question-tech-dialog.component";
import { AddquestionTechPriveComponent } from "../addquestion-tech-prive/addquestion-tech-prive.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-question-tech-prive",
  templateUrl: "./question-tech-prive.component.html",
  styleUrls: ["./question-tech-prive.component.scss"],
})
export class QuestionTechPriveComponent implements OnInit {
  privateQuestions: questionTech[];
  testSectionId: number;
  newQuestion: questionTech = {};
  constructor(
    private testSectiontechService: TestSectionTechServiceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private QuestionsTechService: QuestionsTechService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.testSectionId = +params.get("id");
      console.log("id", this.testSectionId);
      this.getPrivateQuestions(this.testSectionId);
    });
  }

  getPrivateQuestions(testSectionId: number): void {
    this.testSectiontechService
      .getPrivateQuestionsByTestSectionId(testSectionId)
      .subscribe((privateQuestions) => {
        this.privateQuestions = privateQuestions;
      });
  }

  openViewQuestionDialog(id: number): void {
    this.QuestionsTechService.getQuestionTechById(id).subscribe(
      (question) => {
        const dialogRef = this.dialog.open(AfficheQuestionTechDialogComponent, {
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
    const dialogRef = this.dialog.open(AddquestionTechPriveComponent, {
      data: { testSectionId: this.testSectionId },
    });

    dialogRef.afterClosed().subscribe((newQuestion: questionTech) => {
      if (newQuestion && this.testSectionId !== null) {
        this.addQuestion(newQuestion, this.testSectionId);
      } else {
        console.error(
          "ID de la section de test non trouvé dans l'URL ou newQuestion non défini."
        );
      }
    });
  }

  addQuestion(newQuestion: questionTech, testSectionId: number): void {
    this.testSectiontechService
      .createPrivateQuestionTechnique(newQuestion, testSectionId)
      .subscribe(
        (response) => {
          console.log("Question ajoutée avec succès : ", response);
          this.toastr.success("Question ajoutée avec succès ");
          this.getPrivateQuestions(testSectionId);
        },
        (error) => {
          console.error("Erreur lors de l'ajout de la question : ", error);
          this.toastr.error(
            "Erreur lors de l'ajout de la question essayer  une autre fois "
          );
        }
      );
  }
}
