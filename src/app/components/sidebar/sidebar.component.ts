import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/Models/user";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "src/app/service/user-service/user.service";

interface ChildRouteInfo {
  path: string;
  title: string;
  icon: string;
  roles?: string[];
  class: string;
}
interface RouteInfo {
  path?: string;
  title: string;
  expanded?: boolean;
  icon: string;
  children?: ChildRouteInfo[];
  class: string;
  roles?: string[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Accueil",
    icon: "ni-tv-2 text-yellow",
    class: "",
    roles: ["admin", "recruteur"],
  },
  {
    path: "/user-profile",
    title: "Profil utilisateur",
    icon: "ni-single-02 text-yellow",
    class: "",
    roles: ["admin", "recruteur"],
  },
  {
    path: "/liste-des-utilisateurs",
    title: "Liste des utilisateurs",
    icon: "fa-solid fa-users text-yellow",
    class: "",
    roles: ["admin"],
  },

  {
    path: "/liste-des-domaines",
    title: "Liste des domaines",
    icon: "fa-solid fa-laptop-code text-yellow",
    class: "",
    roles: ["admin"], // Définir les rôles comme un tableau de chaînes
  },
  {
    path: "",
    title: "Liste des questions",
    icon: "ni ni-ungroup text-yellow",
    class: "",
    roles: ["admin"], // Définir les rôles comme un tableau de chaînes

    expanded: false,

    children: [
      {
        path: "/questions-techniques",
        title: "Questions Techniques",
        icon: "point",
        class: "",
        roles: ["admin"],
      },
      {
        path: "/questions-logiques",
        title: "Questions Logiques",
        icon: "point",
        class: "",
        roles: ["admin"],
      },
    ],
  },
  {
    path: "",
    title: "Sections des Tests",
    icon: "ni ni-ungroup text-yellow",
    class: "",
    roles: ["admin", "recruteur"],

    expanded: false,

    children: [
      {
        path: "/testSection-Logique",
        title: "Sections Logiques",
        icon: "point",
        class: "",
        roles: ["admin", "recruteur"], // Définir les rôles comme un tableau de chaînes
      },
      {
        path: "/testSection-Technique",
        title: "Sections Techniques",
        icon: "point",
        class: "",
        roles: ["admin", "recruteur"], // Définir les rôles comme un tableau de chaînes
      },
    ],
  },
  {
    path: "/liste-des-candidats",
    title: "Liste des cadidats",
    icon: " fa-solid fa-clipboard-user text-yellow",
    class: "",
    roles: ["admin", "recruteur"], // Définir les rôles comme un tableau de chaînes
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  public isCollapsed = true;
  public user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,

    private http: HttpClient
  ) {}
  ngOnInit() {
    this.getUserData();
    const role = this.authService.extractRoleFromToken();
    console.log("Role extrait du token :", role);
    if (role === "admin") {
      this.menuItems = ROUTES.filter((menuItem) =>
        menuItem.roles ? menuItem.roles.includes("admin") : true
      ).map((menuItem) => {
        if (menuItem.children) {
          menuItem.children = menuItem.children.filter((child) =>
            child.roles ? child.roles.includes("admin") : true
          );
        }
        return menuItem;
      });
      console.log("Routes filtrées pour l'admin :", this.menuItems);
    } else if (role === "recruteur") {
      this.menuItems = ROUTES.filter((menuItem) =>
        menuItem.roles ? menuItem.roles.includes("recruteur") : false
      ).map((menuItem) => {
        if (menuItem.children) {
          menuItem.children = menuItem.children.filter((child) =>
            child.roles ? child.roles.includes("recruteur") : false
          );
        }
        return menuItem;
      });
      console.log("Routes filtrées pour le recruteur :", this.menuItems);
    } else {
      this.menuItems = [];
    }
  }

  toggleDropdown(menuItem: RouteInfo) {
    menuItem.expanded = !menuItem.expanded;
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
  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`http://localhost:8090/image/${imageName}`, {
      responseType: "blob",
    });
  }
}
