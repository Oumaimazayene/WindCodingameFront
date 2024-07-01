import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "../../service/user-service/user.service";
import { ChangePasswordDialogComponent } from "./change-password-dialog/change-password-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: string | null = null;
  showPassword: boolean = false;
  @ViewChild("alertContainer", { read: ViewContainerRef })
  alertContainer: ViewContainerRef;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userservice: UserService,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  async login() {
    if (this.form.valid) {
      try {
        const { email, password } = this.form.value;
        const response = await this.authService
          .login({ email, password })
          .toPromise();

        if (response && response.token) {
          localStorage.setItem("token", response.token);

          const uuid = this.authService.extractUUIDFromToken();
          this.userservice.getUserByUUID(uuid).subscribe(
            (user) => {
              console.log(user);
              this.router.navigate(["/dashboard"]);
              if (!user.isDeleted) {
                const dialogRef = this.dialog.open(
                  ChangePasswordDialogComponent
                );
              }
            },
            (error) => {
              console.error(
                "Erreur lors de la récupération des données de l'utilisateur :",
                error
              );
            }
          );
        } else {
          this.loginError = "Adresse e-mail ou mot de passe incorrect.";
          this.toastr.error(
            "Adresse e-mail ou mot de passe incorrect.",
            "Erreur de connexion"
          );
        }
      } catch (error) {
        this.loginError = "Erreur lors de la connexion.";
        this.toastr.error("Erreur lors de la connexion.", "Erreur");
      }
    } else {
      this.loginError = "Veuillez remplir tous les champs correctement.";
      this.toastr.error(
        "Veuillez remplir tous les champs correctement.",
        "Erreur de formulaire"
      );
    }
  }

  togglePasswordVisibility(formControlName: string): void {
    const control = this.form.get(formControlName);
    if (control) {
      const inputElement = document.querySelector(
        `[formControlName="${formControlName}"]`
      );
      if (inputElement) {
        const inputType = inputElement.getAttribute("type");
        if (inputType === "password") {
          this.renderer.setAttribute(inputElement, "type", "text");
        } else {
          this.renderer.setAttribute(inputElement, "type", "password");
        }
      }
    }
  }
}
