import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("gbgradien");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("gbgradien");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("gbgradien");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("gbgradien");
  }
}
