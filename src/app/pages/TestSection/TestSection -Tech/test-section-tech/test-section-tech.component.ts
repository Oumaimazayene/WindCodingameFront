import { Component, OnInit } from "@angular/core";
import { TestSectionTech } from "src/app/Models/testSection-Tech";
import { AuthService } from "src/app/service/auth.service";
import { TestSectionTechServiceService } from "src/app/service/TestSection-Tech-Service/test-section-tech-service.service";
import { ViewTestSectionTechDialogComponent } from "../view-test-section-tech-dialog/view-test-section-tech-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddTestSectionTechDialogComponent } from "../add-test-section-tech-dialog/add-test-section-tech-dialog.component";
import { questionTech } from "src/app/Models/questionTech";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-section-tech",
  templateUrl: "./test-section-tech.component.html",
  styleUrls: ["./test-section-tech.component.scss"],
})
export class TestSectionTechComponent implements OnInit {
  userUUID: string;
  testSectionTech: TestSectionTech[];
  pagedTestSection: TestSectionTech[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  newSection: TestSectionTech = {};
  sommeQuestionsPrivees: number;
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  filterDifficulty: string | null = null;
  filterExperience: string | null = null;
  constructor(
    private authService: AuthService,
    private testSectionTechService: TestSectionTechServiceService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.testSectionTechService
      .getPrivateQuestionsSumByUserUUID(uuid)
      .subscribe((sommeQuestionsPrivees: number) => {
        this.sommeQuestionsPrivees = sommeQuestionsPrivees;
        console.log("Somme des questions privées :", sommeQuestionsPrivees);

        this.getTestSectionsByUserUUID(uuid);
      });

    this.filterTestSections();
  }

  getTestSectionsByUserUUID(userUUID: string): void {
    this.testSectionTechService
      .getTestSectionsByUserUUID(userUUID)
      .subscribe((data) => {
        this.testSectionTech = data;
        this.totalItems = this.testSectionTech.length;
        this.setPage(1);
        console.log("testsection", this.testSectionTech);
        console.log("aaaa", this.totalItems);
      });
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedTestSection = this.testSectionTech.slice(startIndex, endIndex);
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
  filterTestSections(): void {
    this.testSectionTechService
      .filterTestSections(this.filterExperience, this.filterDifficulty)
      .subscribe(
        (filteredTestSections) => {
          this.testSectionTech = filteredTestSections;
          this.totalItems = this.testSectionTech.length;
          this.setPage(1);
        },
        (error) => {
          console.error(
            "Erreur lors du filtrage des sections de test : ",
            error
          );
        }
      );
  }

  createTestSection(newSection: any): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.testSectionTechService.createTestSection(newSection, uuid).subscribe(
      (data) => {
        console.log("Section de test créée :", data);
        this.toastr.success("Section de test créée avec succès");

        this.getTestSectionsByUserUUID(uuid);
      },
      (error) => {
        console.error(
          "Erreur lors de la création de la section de test :",
          error
        );
        this.toastr.error("Erreur lors de la création de la section de test");
      }
    );
  }

  openViewTestSectionTechDialog(id: number): void {
    this.testSectionTechService.getTestSectionById(id).subscribe(
      (testSectionTech) => {
        const dialogRef = this.dialog.open(ViewTestSectionTechDialogComponent, {
          data: testSectionTech,
        });
        console.log("id", this.testSectionTech);

        dialogRef.afterClosed().subscribe(() => {});
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des détails de test section tech  : ",
          error
        );
      }
    );
  }

  openAddTestSectionTech(): void {
    const dialogRef = this.dialog.open(AddTestSectionTechDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: TestSectionTech | undefined) => {
      if (result) {
        this.createTestSection(result);
      }
    });
  }
  getPrivateQuestions(testSectionId: number): Observable<questionTech[]> {
    return this.testSectionTechService
      .getPrivateQuestionsByTestSectionId(testSectionId)
      .pipe(
        catchError((error) => {
          console.error(
            "Une erreur est survenue lors de la récupération des questions privées :",
            error
          );
          return throwError(
            "Erreur lors de la récupération des questions privées. Veuillez réessayer plus tard."
          );
        })
      );
  }
  handleIconClick(testSectionId: number): void {
    this.router.navigate(["/questionprivee-Tech", testSectionId]);
  }

  openListDesTestTech(testSectionUUID: string): void {
    this.router.navigateByUrl(`/liste-des-Tests-Tech/${testSectionUUID}`);
  }
}
