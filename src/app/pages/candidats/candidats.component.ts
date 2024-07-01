import { Component, OnInit } from "@angular/core";
import { candidat } from "src/app/Models/candidat";
import { AuthService } from "src/app/service/auth.service";
import { CandidatServiceService } from "src/app/service/candidat-service/candidat-service.service";

@Component({
  selector: "app-candidats",
  templateUrl: "./candidats.component.html",
  styleUrls: ["./candidats.component.scss"],
})
export class CandidatsComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  pagedCandidat: candidat[] = [];
  candidats: candidat[] = [];

  constructor(
    private candidatService: CandidatServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.candidatService.getCandidatesByUserUUID(uuid).subscribe(
      (data: candidat[]) => {
        this.candidats = data.filter((candidat) => candidat != null);
        this.totalItems = this.candidats.length;
        this.setPage(this.currentPage);
      },
      (error) => {
        console.error("Erreur lors de la récupération des candidats", error);
      }
    );
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedCandidat = this.candidats.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.setPage(event);
  }

  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
}
