import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get("newPassword");
    const confirmPassword = group.get("confirmPassword");
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const email = this.resetForm.get("email").value;
      const newPassword = this.resetForm.get("newPassword").value;

      this.authService.resetPassword(email, newPassword).subscribe(
        () => {
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error(
            "Erreur lors de la réinitialisation du mot de passe :",
            error
          );
        }
      );
    } else {
    }
  }
}
