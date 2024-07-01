import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Answer } from "src/app/Models/Answer";
import { questionLog } from "src/app/Models/questionLog";
import { QuestionLogicService } from "src/app/service/question-logique/questions-logique.service";
import { ImageServiceService } from "src/app/service/image-service/image-service.service";

@Component({
  selector: "app-view-question-log-dialog",
  templateUrl: "./view-question-log-dialog.component.html",
  styleUrls: ["./view-question-log-dialog.component.scss"],
})
export class ViewQuestionLogDialogComponent implements OnInit {
  question: questionLog;
  codeBlock: any;
  answersList: Answer[] = [];
  time: any;
  imageUrl: string;
  showSecondStep: boolean = false;
  showThirdStep: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private questionLogicService: QuestionLogicService,
    private imageService: ImageServiceService,
    public dialogRef: MatDialogRef<ViewQuestionLogDialogComponent>
  ) {
    this.question = data;
  }

  ngOnInit(): void {
    this.getQuestionDetails();
  }

  getQuestionDetails() {
    this.questionLogicService
      .getQuestionLogiqueById(this.question.id)
      .subscribe((res: questionLog) => {
        this.question = res;
        this.codeBlock = this.question.questionBody;
        this.time = this.convertToTime(res.time);
        this.imageService
          .getImageFileNameFromUrl(this.question.urlimage)
          .subscribe(
            (imageUrl: string) => {
              this.imageUrl = imageUrl;
            },
            (error) => {
              console.error(
                "Erreur lors de la récupération de l'URL de l'image : ",
                error
              );
            }
          );
      });
  }

  convertToTime(time: number) {
    var totalTimeInSecond = time;
    var minute = Math.floor(totalTimeInSecond / 60);
    var second = totalTimeInSecond - minute * 60;
    return "0" + minute + ":" + second;
  }

  goToSecondStep(stepper: any) {
    stepper.next();
  }
  goToThirdStep(stepper: any) {
    stepper.next();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
