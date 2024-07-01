import { Component, OnInit } from "@angular/core";
import { Domaine } from "src/app/Models/domaine";
import { DomainsService } from "src/app/service/domain-service/domains.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationDialogComponent } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";
import { AjoutConfirmationDialogComponent } from "./ajout-confirmation-dialog/ajout-confirmation-dialog.component";
import { UpdateConfirmationDialogComponent } from "./update-confirmation-dialog/update-confirmation-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-domains",
  templateUrl: "./domains.component.html",
  styleUrls: ["./domains.component.scss"],
})
export class DomainsComponent implements OnInit {
  filterName: string;
  filteredDomaines: Domaine[];
  domaines: Domaine[];
  newDomaine: Domaine = {
    name: "",
    version: "",
    lang: "",
  };
  domaineToEdit: Domaine;
  showAddCard: boolean = false;
  showUpdateCard: boolean = false;
  showDeleteConfirmation: boolean = false;
  domainIdToDelete: number;
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  pagedDomaines: Domaine[] = [];

  constructor(
    private domaineService: DomainsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDomaines();
  }

  getAllDomaines() {
    this.domaineService.getAllDomaines().subscribe((domaines) => {
      this.domaines = domaines;
      this.filterDomaines();
    });
  }

  openAddDomainDialog(): void {
    const dialogRef = this.dialog.open(AjoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((newDomaine: Domaine) => {
      if (newDomaine) {
        this.addDomaine(newDomaine);
      }
    });
  }

  addDomaine(newDomaine: Domaine): void {
    this.domaineService.addDomaine(newDomaine).subscribe(
      () => {
        this.getAllDomaines();
        this.toastr.success("Domaine ajouté avec succès");
      },
      (error) => {
        console.error("Erreur lors de l'ajout du domaine :", error);
        this.toastr.error("Erreur : Domaine n'est pas valide ");
      }
    );
  }

  resetNewDomaine() {
    this.newDomaine = {
      name: "",
      version: "",
      lang: "",
    };
  }

  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDomaine(id);
      } else {
        console.log("Suppression annulée");
      }
    });
  }

  deleteDomaine(id: number) {
    this.domaineService.deleteDomaine(id).subscribe(
      () => {
        this.getAllDomaines();
        this.toastr.success("Domaine supprimé avec succès");
      },
      (error) => {
        console.error("Erreur lors de la suppression du domaine :", error);
        this.toastr.error("Erreur lors de la suppression du domaine");
      }
    );
  }

  editDomaine(domaine: Domaine) {
    this.showUpdateCard = true;
    this.domaineToEdit = { ...domaine };
  }

  openUpdateDialog(domaine: Domaine): void {
    const dialogRef = this.dialog.open(UpdateConfirmationDialogComponent, {
      data: domaine,
    });

    dialogRef.afterClosed().subscribe((result: Domaine) => {
      if (result) {
        this.updateDomaine(result);
      }
    });
  }

  updateDomaine(domaineToUpdate: Domaine) {
    this.domaineService
      .updateDomaine(domaineToUpdate.id, domaineToUpdate)
      .subscribe(
        () => {
          this.getAllDomaines();
          this.toastr.success("Domaine mis à jour avec succès");
        },
        (error) => {
          console.error("Erreur lors de la mise à jour du domaine :", error);
          this.toastr.error("Erreur lors de la mise à jour du domaine");
        }
      );
  }

  searchDomaines(): void {
    this.currentPage = 1;
    this.filterDomaines();
  }

  filterDomaines(): void {
    if (!this.filterName) {
      this.filteredDomaines = [...this.domaines];
    } else {
      this.filteredDomaines = this.domaines.filter((domaine) =>
        domaine.name.toLowerCase().includes(this.filterName.toLowerCase())
      );
    }
    this.totalItems = this.filteredDomaines.length;
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedDomaines = this.filteredDomaines.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.setPage(event);
  }

  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
}
