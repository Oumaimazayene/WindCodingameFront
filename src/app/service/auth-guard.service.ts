import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
  canActivateAdmin(): boolean {
    const role = this.authService.extractRoleFromToken();
    if (role !== "admin") {
      this.router.navigate(["/unauthorized"]);
      return false;
    }
    return true;
  }

  canActivateRecruteur(): boolean {
    const role = this.authService.extractRoleFromToken();
    if (role !== "recruteur") {
      this.router.navigate(["/unauthorized"]);
      return false;
    }
    return true;
  }
}
