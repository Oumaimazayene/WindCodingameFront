import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user-service/user.service";
import { ConfirmValidationComponent } from "./confirm-validation/confirm-validation.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  users: any[] = [];
  notValidUsers: any[] = [];
  validUsersCount: number;
  invalidUsersCount: number;
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  userspage: any[] = [];
  validationInProgress: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.loadCounts();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.setPage(1);
        console.log(data);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs :",
          error
        );
      }
    );
  }
  getAllValidUsers(): void {
    this.userService.getAllValidUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs :",
          error
        );
      }
    );
  }

  getAllNotValidUsers(): void {
    this.userService.getAllNotValidUsers().subscribe(
      (data: any[]) => {
        this.notValidUsers = data;
        console.log(data);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs :",
          error
        );
      }
    );
  }
  validateUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmValidationComponent, {
      data: {
        userId: userId,
        validateUser: () => this.userService.validateUser(userId),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.validateUser(userId).subscribe(
          (response) => {
            console.log("Validation réussie :", response);
            typeof response === "string" ? response : "Validation réussie";
            this.toastr.success("validation réussie");
            this.getAllUsers();
          },
          (error) => {
            console.error(
              "Erreur lors de la validation de l'utilisateur :",
              error
            );
            this.toastr.error("Erreur lors de la validation de l'utilisateur");
          }
        );
      }
    });
  }

  // validatePartner(id: number): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: { message: 'Êtes-vous sûr de vouloir valider ce partenaire ?' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.http.post(${this.baseUrl}/validate/${id}, {}).subscribe(
  //         (response: any) => {
  //           console.log('Partenaire validé avec succès');
  //           this.loadPartners();
  //           this.snackBar.open('Partenaire validé avec succès', 'Fermer', {
  //             duration: 3000,
  //             panelClass: ['snackbar-success']
  //           });

  //           // Émettre l'événement lorsque le partenaire est validé avec succès
  //           dialogRef.componentInstance.partnerValidated.emit();
  //         },
  //         (error) => {
  //           console.error('Erreur lors de la validation du partenaire :', error);
  //           this.snackBar.open('Erreur lors de la validation du partenaire', 'Fermer', {
  //             duration: 3000,
  //             panelClass: ['snackbar-error']
  //           });
  //         }
  //       );
  //     }
  //   });
  // }

  loadCounts(): void {
    this.userService.getCountValidUsers().subscribe(
      (count) => {
        this.validUsersCount = count;
      },
      (error) => {
        console.error("Error loading valid users count:", error);
      }
    );

    this.userService.getCountInvalidUsers().subscribe(
      (count) => {
        this.invalidUsersCount = count;
      },
      (error) => {
        console.error("Error loading invalid users count:", error);
      }
    );
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.userspage = this.users.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmValidationComponent, {
      data: { userId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.validationInProgress = true;
        this.validateUser(id);
      } else {
        console.log("Validation annulée");
      }
    });
  }

  filterValidUsers(): void {
    this.userService.getAllValidUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.setPage(1);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs validés :",
          error
        );
      }
    );
  }

  filterInvalidUsers(): void {
    this.userService.getAllNotValidUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.setPage(1);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs non validés :",
          error
        );
      }
    );
  }
}
