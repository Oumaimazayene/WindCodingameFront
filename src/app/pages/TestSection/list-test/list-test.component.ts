import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestService } from "src/app/service/test-service/test.service";
import { AddTestLogiqueComponent } from "../test-section-logique/add-test-logique/add-test-logique.component";
import { MatDialog } from "@angular/material/dialog";
import { TestSectionLogiqueService } from "src/app/service/testSection_logique-service/test-section-logique-service.service";
import { SendTestComponent } from "./send-test/send-test.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list-test",
  templateUrl: "./list-test.component.html",
  styleUrls: ["./list-test.component.scss"],
})
export class ListTestComponent implements OnInit {
  testSectionUUID: string;
  tests: any[] = [];
  qtsNumber: number;
  testSection: any = {};
  pagedTests: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private testSectionLogiqueService: TestSectionLogiqueService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testSectionUUID = params["testSectionUUID"];
      console.log("UUID de la section de test:", this.testSectionUUID);

      if (this.testSectionUUID) {
        this.getTests(this.testSectionUUID);
      } else {
        console.error("UUID de la section de test non valide.");
      }
    });
    this.getTests(this.testSectionUUID);
  }
  getTests(testSectionUUID: string): void {
    this.testService.getTestsByTestSectionUUID(testSectionUUID).subscribe(
      (tests) => {
        this.tests = tests.filter(
          (test) => test.testSectionUUID === testSectionUUID
        );
        this.totalItems = this.tests.length;

        this.setPage(1);
        console.log("aaaaa", this.tests);
      },
      (error) => {
        console.error("Erreur lors de la récupération des tests:", error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
  }

  openAddTestLogDialog(testSectionUUID: string): void {
    const dialogRef = this.dialog.open(AddTestLogiqueComponent, {
      data: { testSectionUUID: testSectionUUID },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { size: number; privateqts: number } | undefined) => {
        if (result) {
          if (result.size >= 0 && result.privateqts >= 0) {
            console.log("Result from dialog:", result);
            this.createTestLog(testSectionUUID, result.size, result.privateqts);
            console.log(
              "this  data",
              testSectionUUID,
              result.size,
              result.privateqts
            );
            this.getTests(this.testSectionUUID);
            this.toastr.success("Test créer  avec succés");
            dialogRef.close();
          } else {
            console.error(
              "Les valeurs de size et privateqts doivent être des nombres positifs ou nuls."
            );
            this.toastr.error(
              "Erreur de création de test essayer une autre fois "
            );
          }
        }
      });
  }

  createTestLog(
    testSectionUUID: string,
    size: number,
    privateqts: number
  ): void {
    this.testSectionLogiqueService
      .getTestSectionByUUID(testSectionUUID)
      .subscribe(
        (testSection) => {
          if (testSection) {
            this.testSection = testSection;
            this.qtsNumber = this.testSection.qtsNumber;

            if (size + privateqts > this.qtsNumber) {
              console.error(
                "La somme de size et privateqts dépasse qtsNumber. Impossible de créer le test."
              );
              return;
            }

            console.log(
              "Creating test log with:",
              testSectionUUID,
              size,
              privateqts
            );
            this.testService
              .createTestLog(testSectionUUID, size, privateqts)
              .subscribe(
                (data) => {
                  console.log("Test logique créé :", data);
                  this.ngOnInit();
                },
                (error) => {
                  console.error(
                    "Erreur lors de la création du test logique :",
                    error
                  );
                }
              );
          } else {
            console.error(
              "La section de test avec l'UUID spécifié n'a pas été trouvée."
            );
          }
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la section de test :",
            error
          );
        }
      );
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedTests = this.tests.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshTest(): void {
    this.setPage(this.currentPage);
  }

  openDialogToSendEmail(testId: number): void {
    const dialogRef = this.dialog.open(SendTestComponent, {
      data: { testId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Email envoyé avec succès !");
      }
    });
  }
}
