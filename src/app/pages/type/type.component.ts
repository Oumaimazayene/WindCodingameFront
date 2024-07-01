import { Component, OnInit } from "@angular/core";
import { TypeService } from "src/app/service/type-service/type.service";
import { Type } from "src/app/Models/type";
import { AddTypeDialogComponent } from "./add-type-dialog/add-type-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationDialogComponent } from "../domains/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { DeleteTypeDialogComponent } from "./delete-type-dialog/delete-type-dialog.component";
import { UpdateTypeDialogComponent } from "./update-type-dialog/update-type-dialog.component";

@Component({
  selector: "app-type",
  templateUrl: "./type.component.html",
  styleUrls: ["./type.component.scss"],
})
export class TypeComponent implements OnInit {
  types: Type[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  pagedType: Type[];
  TypeToEdit: Type;
  showUpdateCard: boolean = false;

  constructor(private typeService: TypeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllTypes();
  }

  getTypeById(id: number): void {
    this.typeService.getTypeById(id).subscribe(
      (type) => {
        console.log("Type récupéré:", type);
      },
      (error) => {
        console.error("Erreur lors de la récupération du type:", error);
      }
    );
  }

  getAllTypes(): void {
    this.typeService.getAllTypes().subscribe(
      (types) => {
        this.types = types;
        this.totalItems = this.types.length;
        this.setPage(1);
      },
      (error) => {
        console.error("Erreur lors de la récupération des types:", error);
      }
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedType = this.types.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }

  addType(newType: Type): void {
    this.typeService.createType(newType).subscribe(
      (response) => {
        console.log("Type ajouté avec succès :", response);
        this.getAllTypes();
      },
      (error) => {
        console.error("Erreur lors de l'ajout du type :", error);
      }
    );
  }

  openAddTypeDialog(): void {
    const dialogRef = this.dialog.open(AddTypeDialogComponent);
    dialogRef.afterClosed().subscribe((newType: Type) => {
      if (newType) {
        this.addType(newType);
      }
    });
  }
  deleteType(id: number): void {
    this.typeService.deleteType(id).subscribe(
      () => {
        console.log("Type supprimé avec succès");
        this.getAllTypes();
      },
      (error) => {
        console.error("Erreur lors de la suppression du type :", error);
      }
    );
  }
  openDeleteType(id: number): void {
    const dialogRef = this.dialog.open(DeleteTypeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteType(id);
        this.getAllTypes();
      } else {
        console.log("Suppression annulée");
      }
    });
  }
  updateType(id: number, updatedType: Type): void {
    this.typeService.updateType(id, updatedType).subscribe(
      (response) => {
        if (response) {
          console.log("Type mis à jour avec succès :", response);
          this.getAllTypes();
          this.showUpdateCard = false;
        }
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du type :", error);
      }
    );
  }

  openUpdateDialog(type: Type): void {
    console.log("Type object:", type);
    const dialogRef = this.dialog.open(UpdateTypeDialogComponent, {
      data: type,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { id: number; updatedType: Type }) => {
        console.log("Dialog closed with result:", result);
        if (result && result.id && result.updatedType) {
          this.updateType(result.id, result.updatedType);
        }
      });
  }

  editType(type: Type) {
    this.showUpdateCard = true;
    this.TypeToEdit = { ...type };
  }
}
