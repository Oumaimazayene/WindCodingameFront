import { Component, OnInit } from "@angular/core";
import { QuestionsTechService } from "../../../service/question-tech/questions-tech.service";
import { questionTech } from "../../../Models/questionTech";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddQuestionTechDialogComponent } from "./add-question-tech-dialog/add-question-tech-dialog.component";
import { DeleteQuestionTechDialogComponent } from "./delete-question-tech-dialog/delete-question-tech-dialog.component";
import { AfficheQuestionTechDialogComponent } from "./affiche-question-tech-dialog/affiche-question-tech-dialog.component";
import { DomainsService } from "../../../service/domain-service/domains.service";
import { Domaine } from "src/app/Models/domaine";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-questions-tech",
  templateUrl: "./questions-tech.component.html",
  styleUrls: ["./questions-tech.component.scss"],
})
export class QuestionsTechComponent implements OnInit {
  questionsTech: questionTech[] = [];
  pagedQuestions: questionTech[] = [];
  newQuestion: questionTech = {};
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  filterDifficulty: string | null;
  fiterDomain: string | null = null;
  filterType: string | null = null;
  domaines: string[];
  technicalQuestionsCount: number;
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  domainsCount: number;

  constructor(
    private questionsTechService: QuestionsTechService,
    private DomainsService: DomainsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllQuestionsTech();
    this.loadDomaines();
    this.getTechnicalQuestionsCount();
    this.getNombreDomaines();
  }

  getAllQuestionsTech(): void {
    this.questionsTechService.getAll().subscribe(
      (data: questionTech[]) => {
        this.questionsTech = data;
        this.totalItems = this.questionsTech.length;
        this.setPage(1);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des questions techniques : ",
          error
        );
      }
    );
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedQuestions = this.questionsTech.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
  addQuestion(newQuestion: questionTech): void {
    this.questionsTechService.addQuestionTech(newQuestion).subscribe(
      (response) => {
        console.log("Question ajoutée avec succès : ", response);
        this.toastr.success("Question Technique ajoutée avec succès");
        this.getAllQuestionsTech();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la question : ", error);
        this.toastr.error("Erreur lors de l'ajout de la question");
      }
    );
  }

  openAddQuestionTechDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionTechDialogComponent);
    dialogRef.afterClosed().subscribe((newQuestion: questionTech) => {
      if (newQuestion) {
        this.addQuestion(newQuestion);
      }
    });
  }

  deleteQuestion(id: number): void {
    this.questionsTechService.deleteQuestionTech(id).subscribe(
      () => {
        console.log("Question supprimée avec succès");
        this.getAllQuestionsTech();
      },
      (error) => {
        console.error("Erreur lors de la suppression de la question : ", error);
      }
    );
  }

  openDeleteQuestionDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteQuestionTechDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteQuestion(id);
      } else {
        console.log("Suppression annulée");
      }
    });
  }
  openViewQuestionDialog(id: number): void {
    this.questionsTechService.getQuestionTechById(id).subscribe(
      (question: questionTech[]) => {
        const dialogRef = this.dialog.open(AfficheQuestionTechDialogComponent, {
          data: question,
          maxHeight: "80vh",
          maxWidth: "80vw",
          height: "80%",
          width: "80%",
          panelClass: "centered-dialog",
        });
        console.log("question", question);

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

  filterQuestion(): void {
    this.questionsTechService
      .filterTechnicalQuestionsByTypeAndDifficultyAndDomainName(
        this.filterType,
        this.filterDifficulty,
        this.fiterDomain
      )
      .subscribe(
        (data: questionTech[]) => {
          this.questionsTech = data;
          this.totalItems = this.questionsTech.length;
          this.setPage(1);
        },
        (error) => {
          console.error(
            "Une erreur est survenue lors de la récupération des questions techniques filtrées : ",
            error
          );
        }
      );
  }

  loadDomaines(): void {
    this.DomainsService.getAllDomaines().subscribe(
      (domaines: Domaine[]) => {
        this.domaines = domaines.map((domaine) => domaine.name);
        console.log("domaines", domaines);
      },
      (error) => {
        console.error("Erreur lors du chargement des domaines :", error);
      }
    );
  }
  getTechnicalQuestionsCount(): void {
    this.questionsTechService.countTechnicalQuestions().subscribe(
      (count) => {
        this.technicalQuestionsCount = count;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération du nombre de questions techniques :",
          error
        );
      }
    );
  }
  getNombreDomaines(): void {
    this.DomainsService.countDomains().subscribe(
      (count) => {
        this.domainsCount = count;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération du nombre de domaines :",
          error
        );
      }
    );
  }
}
