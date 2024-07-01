import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestService } from "src/app/service/test-service/test.service";

@Component({
  selector: "app-testdetails",
  templateUrl: "./testdetails.component.html",
  styleUrls: ["./testdetails.component.scss"],
})
export class TestdetailsComponent implements OnInit {
  testId: number;
  test: any;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.testId = +params.get("id");
      console.log(this.testId);
      this.loadTestDetails();
    });
  }

  loadTestDetails() {
    this.testService.getTestById(this.testId).subscribe((data: any) => {
      this.test = data;
      console.log("aaaa", this.test);
    });
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
  }
}
