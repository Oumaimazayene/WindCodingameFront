import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  errorMessage: string = "";
  form: FormGroup;
  isLoading: boolean = false;
  showPassword: boolean = false;
  showCards: boolean = false;
  showChangePassword: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  toggleCards(): void {
    this.showCards = !this.showCards;
  }
  initForm(): void {
    this.form = this.fb.group(
      {
        oldPassword: ["", [Validators.required, Validators.minLength(6)]],
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: [
          "",
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get("newPassword").value === g.get("confirmNewPassword").value
      ? null
      : { mismatch: true };
  }

  changePassword(): void {
    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    const { oldPassword, newPassword } = this.form.value;

    // Appel de la méthode pour extraire l'UUID depuis le token
    const uuid = this.authService.extractUUIDFromToken();

    this.authService.changePassword(uuid, oldPassword, newPassword).subscribe(
      () => {
        const successMessage = "Mot de passe changé avec succès";
        console.log(successMessage);
        this.toastr.success("Mot de passe changé avec succès", "Succès");

        this.form.reset();
        this.errorMessage = "";
      },
      (error) => {
        const errorMessage =
          "Erreur lors du changement de mot de passe : " + error;
        console.error(errorMessage);
        this.toastr.error(errorMessage);
        this.errorMessage = errorMessage;
      },
      () => {
        this.isLoading = false;
      }
    );
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
