import { Component, OnInit } from "@angular/core";
import { TestSectionLogiqueService } from "src/app/service/testSection_logique-service/test-section-logique-service.service";
import { TestSectionLogique } from "src/app/Models/TestSectionLogique";
import { UserService } from "src/app/service/user-service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { AddTestSectionDialogComponent } from "./add-test-section-dialog/add-test-section-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { questionLog } from "src/app/Models/questionLog";
import { Observable, catchError, throwError } from "rxjs";
import { TestLogique } from "src/app/Models/TestLogique";
import { TestService } from "../../../service/test-service/test.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-section-logique",
  templateUrl: "./test-section-logique.component.html",
  styleUrls: ["./test-section-logique.component.scss"],
})
export class TestSectionLogiqueComponent implements OnInit {
  testSectionsLog: TestSectionLogique[];
  userUUID: string;
  pagedTestSection: TestSectionLogique[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  newSection: TestSectionLogique = {};
  tests: TestSectionLogique[] = [];
  nombreSectionsTest: number;
  sommeQuestionsPrivees: number;
  private toastr: ToastrService;
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];
  filterDifficulty: string | null = null;
  filterExperience: string | null = null;

  constructor(
    private testSectionLogiqueService: TestSectionLogiqueService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.getCountTestSectionsByUserUUID(uuid);
    this.testSectionLogiqueService
      .getSommeQuestionsPrivees(uuid)
      .subscribe((sommeQuestionsPrivees: number) => {
        this.sommeQuestionsPrivees = sommeQuestionsPrivees;
        console.log("Somme des questions privées :", sommeQuestionsPrivees);
        this.getTestSectionsByUserUUID(uuid);
      });
    this.filterTestSections();
  }

  getTestSectionsByUserUUID(userUUID: string): void {
    this.testSectionLogiqueService
      .getTestSectionsByUserUUID(userUUID)
      .subscribe((data) => {
        this.testSectionsLog = data;
        this.totalItems = this.testSectionsLog.length;
        this.setPage(1);
        console.log("testsection", this.testSectionsLog);
      });
  }
  handleIconClick(testSectionId: number): void {
    this.router.navigate(["/questionprive-log", testSectionId]);
  }
  createTestSection(newSection: TestSectionLogique): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.testSectionLogiqueService
      .createTestSection(newSection, uuid)
      .subscribe(
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
  openAddQuestionTechDialog(): void {
    const dialogRef = this.dialog.open(AddTestSectionDialogComponent);
    dialogRef.afterClosed().subscribe((newSection: TestSectionLogique) => {
      if (newSection) {
        this.createTestSection(newSection);
        dialogRef.close();
      }
    });
  }

  deleteTestSection(id: number): void {
    this.testSectionLogiqueService.deleteTestSection(id).subscribe((data) => {
      console.log(data);
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedTestSection = this.testSectionsLog.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
  }

  deleteAllTestSection(): void {
    this.testSectionLogiqueService.deleteAllTestSection().subscribe((data) => {
      console.log(data);
    });
  }

  getPrivateQuestions(testSectionId: number): Observable<questionLog[]> {
    return this.testSectionLogiqueService
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

  openListDesTest(testSectionUUID: string): void {
    this.router.navigateByUrl(`/liste-des-Tests/${testSectionUUID}`);
  }

  getCountTestSectionsByUserUUID(userUUID: string): void {
    this.testSectionLogiqueService
      .countTestSectionsByUserUUID(userUUID)
      .subscribe(
        (count: number) => {
          this.nombreSectionsTest = count;
          console.log(
            "Nombre de sections de test pour l'utilisateur :",
            this.nombreSectionsTest
          );
        },
        (error) => {
          console.error(
            "Une erreur est survenue lors de la récupération du nombre de sections de test :",
            error
          );
        }
      );
  }

  filterTestSections(): void {
    this.testSectionLogiqueService
      .filterTestSections(this.filterExperience, this.filterDifficulty)
      .subscribe(
        (filteredTestSections) => {
          this.testSectionsLog = filteredTestSections;
          this.totalItems = this.testSectionsLog.length;
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
}
