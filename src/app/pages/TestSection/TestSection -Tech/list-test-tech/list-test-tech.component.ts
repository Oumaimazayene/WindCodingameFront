import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TestService } from "src/app/service/test-service/test.service";
import { SendTestComponent } from "../../list-test/send-test/send-test.component";
import { AddTestTechComponent } from "../add-test-tech/add-test-tech.component";

@Component({
  selector: "app-list-test-tech",
  templateUrl: "./list-test-tech.component.html",
  styleUrls: ["./list-test-tech.component.scss"],
})
export class ListTestTechComponent implements OnInit {
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
    private dialog: MatDialog
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
  }

  getTests(testSectionUUID: string): void {
    this.testService.getTestsByTestSectionUUID(testSectionUUID).subscribe(
      (tests) => {
        this.tests = tests.filter(
          (test) => test.testSectionUUID === testSectionUUID
        );
        this.totalItems = this.tests.length;

        this.setPage(1);
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
  openAddTestTech(testSectionTechUUID: string): void {
    const dialogRef = this.dialog.open(AddTestTechComponent, {
      data: { testSectionTechUUID: testSectionTechUUID },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTests(testSectionTechUUID);
      console.log("The dialog was closed");
    });
  }
}
