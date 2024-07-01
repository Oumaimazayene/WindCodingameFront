import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "src/app/service/user-service/user.service";
import { User } from "src/app/Models/user";
import { TestService } from "src/app/service/test-service/test.service";
import { TestLogique } from "src/app/Models/TestLogique";
import { QuestionLogicService } from "src/app/service/question-logique/questions-logique.service";
import { QuestionsTechService } from "src/app/service/question-tech/questions-tech.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public users: User[];
  public data: any;
  public salesChart;
  totalItems: number = 0;
  testsitem: number = 0;
  public tests: any[];
  public nombreQuestionsLogiques: number = 0;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  technicalQuestionsCount: number = 0;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private testService: TestService,
    private questionLogicService: QuestionLogicService,
    private questionsTechService: QuestionsTechService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.getAllTests();
    this.getNombreQuestionsLogiques();
    this.getTechnicalQuestionsCount();
    this.datasets = [
      [0, 10, 20, 10, 40, 30, 20, 15, 40, 20, 60, 60],
      [0, , 10, 20, 5, 25, 10, 20, 30, 10, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: {
        labels: chartExample2.data.labels,
        datasets: [
          {
            label: chartExample2.data.datasets[0].label,
            data: chartExample2.data.datasets[0].data,
            backgroundColor: chartExample2.data.datasets[0].data.map(
              (value) => {
                if (value > 20) {
                  return "#1c1c2b";
                } else if (value > 10) {
                  return "#3b5999";
                } else {
                  return "#eab308";
                }
              }
            ),
            borderColor: chartExample2.data.datasets[0].data.map((value) => {
              if (value > 20) {
                return "#1c1c2b";
              } else if (value > 10) {
                return "#3b5999";
              } else {
                return "#eab308";
              }
            }),
            borderWidth: 1,
          },
        ],
      },
    });

    var chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: {
        ...chartExample1.options,
        elements: {
          line: {
            borderColor: "#1c1c2b",
          },
        },
      },
      data: chartExample1.data,
    });

    var circleChart = document.getElementById("circleChart");

    var circleChartData = {
      labels: ["Questions Technique", "Questions Logique", "Domaines"],
      datasets: [
        {
          data: [50, 40, 30],
          backgroundColor: ["#FF6384", "#050a24", "#eab308"],
          borderWidth: 1,
        },
      ],
    };

    var circleChartInstance = new Chart(circleChart, {
      type: "pie",
      data: circleChartData,
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.totalItems = this.users.length;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAllTests(): void {
    this.testService.getAllTests().subscribe(
      (data: any[]) => {
        this.tests = data;
        this.testsitem = this.tests.length;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getNombreQuestionsLogiques(): void {
    this.questionLogicService.countLogiqueQuestions().subscribe(
      (count) => {
        this.nombreQuestionsLogiques = count;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération du nombre de questions logiques :",
          error
        );
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
}
