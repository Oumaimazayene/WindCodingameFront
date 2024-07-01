import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user-service/user.service";
import { User } from "src/app/Models/user";
import { Observable } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: User; // Déclarez une variable pour stocker l'utilisateur

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.getUserData();
  }

  getUserData() {
    const uuid = this.authService.extractUUIDFromToken();
    this.userService.getUserByUUID(uuid).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    );
  }

  getTitle() {
    const url = this.location.prepareExternalUrl(this.location.path());

    const specialCases = {
      "/LISTE-DES-TESTS/": "Liste des tests",
    };

    for (const [path, title] of Object.entries(specialCases)) {
      if (url.includes(path)) {
        return title;
      }
    }

    return "Dashboard";
  }

  logout(): void {
    this.authService.logout();
  }
  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`http://localhost:8090/image/${imageName}`, {
      responseType: "blob",
    });
  }
}
