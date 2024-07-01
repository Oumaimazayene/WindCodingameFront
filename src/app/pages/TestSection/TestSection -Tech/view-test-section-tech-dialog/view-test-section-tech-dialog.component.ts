import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TestSectionTechServiceService } from "src/app/service/TestSection-Tech-Service/test-section-tech-service.service";
import { TestSectionTech } from "src/app/Models/testSection-Tech";
import { questionTech } from "src/app/Models/questionTech";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-test-section-tech-dialog",
  templateUrl: "./view-test-section-tech-dialog.component.html",
  styleUrls: ["./view-test-section-tech-dialog.component.scss"],
})
export class ViewTestSectionTechDialogComponent implements OnInit {
  testSectionDetails: TestSectionTech;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private testSectionTechService: TestSectionTechServiceService,
    public dialogRef: MatDialogRef<ViewTestSectionTechDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getTestSectionTechDetails(this.data.id);
  }

  getTestSectionTechDetails(testSectionId: any): void {
    this.testSectionTechService.getTestSectionById(testSectionId).subscribe(
      (details: TestSectionTech) => {
        this.testSectionDetails = details;
        console.log("abcd", details);
      },
      (error: any) => {
        console.error("Error fetching test section details:", error);
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

  closeDialog(): void {
    this.dialogRef.close();
  }
  
 

}
