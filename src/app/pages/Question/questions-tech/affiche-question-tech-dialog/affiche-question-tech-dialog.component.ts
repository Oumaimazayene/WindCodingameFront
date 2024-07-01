import { Component, OnInit, Inject } from "@angular/core";
import { questionTech } from "src/app/Models/questionTech";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { QuestionsTechService } from "../../../../service/question-tech/questions-tech.service";
import { Answer } from "src/app/Models/Answer";

@Component({
  selector: "app-affiche-question-tech-dialog",
  templateUrl: "./affiche-question-tech-dialog.component.html",
  styleUrls: ["./affiche-question-tech-dialog.component.scss"],
})
export class AfficheQuestionTechDialogComponent implements OnInit {
  question: questionTech;
  codeBlock: any;
  answersList: Answer[] = [];
  time: any;
  showAnswerList: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service: QuestionsTechService,
    public dialogRef: MatDialogRef<AfficheQuestionTechDialogComponent>
  ) {
    this.question = data;
  }

  ngOnInit(): void {
    this.getQuestionDetails();
  }

  getQuestionDetails() {
    this.service.getQuestionTechById(this.data.id).subscribe(
      (res: questionTech) => {
        this.question = res;
        this.codeBlock = this.question.questionBody;
        this.time = this.convertToTime(res.time);
        console.log("aaa ", this.question.answer);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  convertToTime(time: number) {
    var totalTimeInSecond = time;
    var minute = Math.floor(totalTimeInSecond / 60);
    var second = totalTimeInSecond - minute * 60;
    return "0" + minute + ":" + second;
  }
  toggleAnswerList() {
    this.showAnswerList = !this.showAnswerList;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
