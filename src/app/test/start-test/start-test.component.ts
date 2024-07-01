import { ActivatedRoute } from "@angular/router";
import { Answer } from "src/app/Models/Answer";
import { submittedQuestionlogique } from "src/app/Models/submittedQuestionlogique";
import { TestService } from "src/app/service/test-service/test.service";
import { CountdownEvent, CountdownComponent } from "ngx-countdown";
import { CookieService } from "ngx-cookie-service";

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  HostListener,
  ViewChild,
} from "@angular/core";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import { CodeServiceService } from "src/app/service/code-service/code-service.service";
import * as ace from "ace-builds";

@Component({
  selector: "app-start-test",
  templateUrl: "./start-test.component.html",
  styleUrls: ["./start-test.component.scss"],
})
export class StartTestComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("editor") private editorRef!: ElementRef;

  @ViewChild("countdown", { static: false }) countdown: CountdownComponent;
  response: any;
  public isEditorVisible: boolean = true;
  private language: string;
  private version: string;
  private stdin: "";
  tick = 1000;
  public id: any;
  public counter: any;
  public questionList: any[] = [];
  public color: string = "black";
  public htmlContent: String = "";
  public questionType: any;
  public isCompleted: boolean = false;
  public submittedQuestions: submittedQuestionlogique[] = [];
  public currentQuestionIndex: number = 0;
  public currentQuestion: any | undefined;
  public submittedQuestion: submittedQuestionlogique;
  public correctAnswers: any = [];
  public alreadySubmitted: boolean = false;
  public ended: boolean = false;
  public showAnswerSection: boolean = false;
  public allQuestionsAnswered: boolean = false;
  public successMessage: string = "";
  public testStarted: boolean = false;
  timetotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private CodeService: CodeServiceService,
    private cookieService: CookieService
  ) {}

  @HostListener("copy", ["$event"])
  onCopy(event: any) {
    event.preventDefault();
  }

  @HostListener("cut", ["$event"])
  onCut(event: any) {
    event.preventDefault();
  }

  @HostListener("paste", ["$event"])
  onPaste(event: any) {
    event.preventDefault();
  }

  ngAfterViewInit(): void {
    if (this.editorRef && this.editorRef.nativeElement) {
      const editorElement = this.editorRef.nativeElement;
      const editor = ace.edit(editorElement);
      this.configureAce(editor);
    } else {
      console.error("Editor element not found in the DOM.");
    }
  }

  private configureAce(editor: any): void {
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBeautify: true,
      fontSize: "16px",
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("testId récupéré depuis l'URL :", this.id);
    this.color = "black";
    this.testService.getTestById(this.id).subscribe(
      (response) => {
        this.questionList = response.questions;
        this.timetotal = response.timeTotale;
        console.log("aaa", this.timetotal);
        if (this.questionList.length > 0) {
          this.currentQuestion = this.questionList[this.currentQuestionIndex];
          this.counter = this.currentQuestion.time;
          this.questionType = this.currentQuestion.type.name;
          console.log("liste des question ", this.questionList);
          console.log("currentQuestion:", this.currentQuestion);
          console.log("questionType:", this.questionType);
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    );
  }
  startTest() {
    this.testStarted = true;
    this.currentQuestion = this.questionList[0];
    this.counter = this.currentQuestion.time;
    this.questionType = this.currentQuestion.type.name;
  }
  endTest() {
    const candidateReponseDtos = this.submittedQuestions;

    this.testService
      .generateTestReport(this.id, candidateReponseDtos)
      .subscribe(
        (response) => {
          console.log("Rapport généré avec succès :", response);
          this.ended = true;
        },
        (error) => {
          console.error("Erreur lors de la génération du rapport :", error);
        }
      );

    this.isCompleted = true;
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      const submittedQuestionIndex = this.submittedQuestions.findIndex(
        (sq) => sq.idQuestion === this.currentQuestion.id
      );

      if (submittedQuestionIndex === -1) {
        const submittedQuestion: submittedQuestionlogique = {
          idQuestion: this.currentQuestion.id,
          reponses: [],
        };
        this.submittedQuestions.push(submittedQuestion);
      }

      this.currentQuestionIndex++;
      this.currentQuestion = this.questionList[this.currentQuestionIndex];
      this.counter = this.currentQuestion.time;
      this.showAnswerSection = false;
      this.questionType = this.currentQuestion.type.name;
    } else {
      this.allQuestionsAnswered = true;
    }
  }
  onTimerFinished(e: CountdownEvent) {
    if (e.action === "done") {
      console.log("Temps écoulé. Passage à la question suivante...");
      this.checkAndSubmitAnswer();
    } else if (e.action === "notify") {
      this.color = e.left <= 10000 ? "red" : "inherit";
    }

    if (e.left === 0) {
      console.log("Temps écoulé. Passage à la question suivante...");
      this.checkAndSubmitAnswer();
      this.color = "black";
      this.counter = this.questionList[this.currentQuestionIndex].time;
    }

    if (this.isLastQuestion() && e.action === "done") {
      this.onSubmitTest(this.id);
    }
  }

  checkAndSubmitAnswer() {
    if (
      this.submittedQuestion &&
      this.submittedQuestion.reponses.length === 0
    ) {
      this.submittedQuestion = {
        idQuestion: this.currentQuestion.id,
        reponses: null,
      };
      if (
        !this.submittedQuestions.some(
          (sq) => sq.idQuestion === this.currentQuestion.id
        )
      ) {
        this.submittedQuestions.push(this.submittedQuestion);
      }
    }
    this.goToNextQuestion();
  }

  submitQuestion(questionId: any, answer: string) {
    const submittedQuestion: submittedQuestionlogique = {
      idQuestion: questionId,
      reponses: answer ? [answer] : [],
    };

    const existingIndex = this.submittedQuestions.findIndex(
      (sq) => sq.idQuestion === questionId
    );

    if (existingIndex !== -1) {
      this.submittedQuestions[existingIndex] = submittedQuestion;
    } else {
      this.submittedQuestions.push(submittedQuestion);
    }

    console.log("submittedQuestions :", this.submittedQuestions);
  }

  checkCheckBoxvalue(event: any, x: Answer, index: any) {
    const eventClick = event.target.checked;
    if (this.questionType === "qcu") {
      if (eventClick) {
        const submittedQuestion: submittedQuestionlogique = {
          idQuestion: this.currentQuestion.id,
          reponses: [x.answer],
        };

        const indexToRemove = this.submittedQuestions.findIndex(
          (sq) => sq.idQuestion === this.currentQuestion.id
        );
        if (indexToRemove !== -1) {
          this.submittedQuestions.splice(indexToRemove, 1);
        }
        this.submittedQuestions.push(submittedQuestion);
      } else {
        const indexToRemove = this.submittedQuestions.findIndex(
          (sq) => sq.idQuestion === this.currentQuestion.id
        );
        if (indexToRemove !== -1) {
          this.submittedQuestions.splice(indexToRemove, 1);
        }
      }
    } else {
      console.error("Le type de question n'est pas pris en charge.");
    }

    console.log("submittedQuestions :", this.submittedQuestions);
  }

  checkCheckBoxvalueQCM(event: any, x: Answer, index: any) {
    const eventClick = event.target.checked;

    if (eventClick) {
      if (
        !this.submittedQuestions.some(
          (sq) => sq.idQuestion === this.currentQuestion.id
        )
      ) {
        this.submittedQuestions.push({
          idQuestion: this.currentQuestion.id,
          reponses: [x.answer],
        });
      }
    } else {
      const indexToRemove = this.submittedQuestions.findIndex(
        (sq) => sq.idQuestion === this.currentQuestion.id
      );
      if (indexToRemove !== -1) {
        this.submittedQuestions.splice(indexToRemove, 1);
      }
    }

    console.log("submittedQuestions :", this.submittedQuestions);
  }
  testSubmit() {
    const existingIndex = this.submittedQuestions.findIndex(
      (question) => question.idQuestion === this.currentQuestion.id
    );

    if (existingIndex !== -1) {
      if (
        this.submittedQuestion &&
        Array.isArray(this.submittedQuestion.reponses) &&
        this.submittedQuestion.reponses.length > 0
      ) {
        this.submittedQuestions[existingIndex].reponses =
          this.submittedQuestion.reponses;
      }
    } else {
      const submittedQuestion: submittedQuestionlogique = {
        idQuestion: this.currentQuestion.id,
        reponses: this.submittedQuestion.reponses
          ? this.submittedQuestion.reponses
          : [],
      };
      this.submittedQuestions.push(submittedQuestion);
    }

    this.submittedQuestion = {
      idQuestion: 0,
      reponses: [],
    };

    console.log("submittedQuestions :", this.submittedQuestions);

    if (this.isLastQuestion()) {
      this.endTest();
    } else {
      this.goToNextQuestion();
    }
  }
  generateReport() {
    this.alreadySubmitted = true;
    this.testService
      .generateFreemarkerTestReport(this.id, this.submittedQuestions)
      .subscribe(
        (response) => {
          console.log(response);

          this.onSubmitTest(this.id);
        },
        (error) => {
          console.error("Erreur lors de la génération du rapport :", error);
        }
      );
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questionList.length - 1;
  }
  runCode() {
    const currentQuestion = this.currentQuestion;

    if (!currentQuestion) {
      console.error("currentQuestion n'est pas défini.");
      return;
    }

    if (this.editorRef && this.editorRef.nativeElement) {
      const editor = ace.edit(this.editorRef.nativeElement);
      const script = editor.getValue();
      this.language = currentQuestion.domain.lang;
      this.version = currentQuestion.domain.version;
      this.stdin = null;
      console.log(this.language);
      console.log(this.version);
      console.log(script);
      console.log(this.stdin);
      this.CodeService.runScript(
        this.language,
        this.version,
        script,
        this.stdin
      ).subscribe(
        (response) => {
          console.log("Réponse reçue :", response);
          if (response && response.output) {
            this.response = response;
            const submittedQuestion = {
              idQuestion: currentQuestion.id,
              reponses: [response.output],
            };
            this.submittedQuestions.push(submittedQuestion);
            console.log("submittedQuestions :", this.submittedQuestions);
          } else {
            console.error(
              "La réponse ne contient pas la propriété 'output'.",
              response
            );
          }
        },
        (error) => {
          console.error("Erreur lors de l'exécution du script :", error);
        }
      );
    } else {
      console.error("this.editorRef.nativeElement est indéfini.");
    }
  }
  onSubmitTest(id: number): void {
    this.testService.submitTest(this.id).subscribe(
      (response) => {
        console.log("Test submitted successfully:", response);
      },
      (error) => {
        console.error("Error submitting test:", error);
      }
    );
  }

  ngOnDestroy(): void {
    this.onSubmitTest(this.id);
    if (!this.alreadySubmitted && !this.isCompleted) {
      this.cookieService.set("alreadySubmitted", "true");
    }
  }
  formatTime(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    return `${minutes} minutes et ${seconds} secondes`;
  }
}
