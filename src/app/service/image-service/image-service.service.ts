import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ImageServiceService {
  private baseUrl = "http://localhost:8070/v2/image";

  constructor(private http: HttpClient) {}

  getImageFileNameFromUrl(imageUrl: string): Observable<string> {
    return this.http.get<string>(imageUrl).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la récupération du nom de fichier de l'image : ",
          error
        );
        return throwError(error);
      })
    );
  }
}
