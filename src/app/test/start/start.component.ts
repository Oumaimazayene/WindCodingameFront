import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TestService } from "src/app/service/test-service/test.service";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"],
})
export class StartComponent implements OnInit {
  testId: any;
  questions: any[] = [];
  timetotal: number = 0;

  constructor(
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.testId = params.get("id");
      if (this.testId) {
        sessionStorage.setItem("testId", this.testId);
        this.testService.getTestById(this.testId).subscribe((response) => {
          this.timetotal = response.timeTotale;
          console.log("time", this.timetotal);
        });
      } else {
        console.error("Aucun ID de test trouvé dans l'URL");
      }
    });
  }

  navigateToTest(): void {
    if (this.testId) {
      this.router.navigate([`/test/test-start/${this.testId}`]);
    } else {
      console.error(
        "Impossible de démarrer le test : aucun ID de test trouvé."
      );
    }
  }
  formatTime(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    return `${minutes} minutes et ${seconds} secondes`;
  }
}
