import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { User } from "../../Models/user";
import { tap, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8090/api/recrutteur";

  constructor(private http: HttpClient) {}

  getUserByUUID(uuid: string): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/${uuid}`)
      .pipe(catchError(this.handleError));
  }
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}/allusers`)
      .pipe(catchError(this.handleError));
  }

  getAllValidUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}/allvalid`)

      .pipe(catchError(this.handleError));
  }
  getAllNotValidUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allNotvalid`);
  }
  private handleError(error: any): Observable<never> {
    console.error("Erreur de requête :", error);
    throw new Error("Une erreur est survenue, veuillez réessayer plus tard.");
  }
  validateUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/validate/${userId}`;
    return this.http.post<any>(url, {}).pipe(
      tap((response) => {
        console.log("Validation réussie:", response);
      }),
      map((response) => {
        return { success: true, message: "Validation réussie" };
      }),
      catchError((error) => {
        let errorMessage =
          "Une erreur est survenue, veuillez réessayer plus tard.";
        if (error.error && typeof error.error === "string") {
          errorMessage = error.error;
        } else if (error.statusText) {
          errorMessage = error.statusText;
        }
        console.error(
          "Erreur lors de la validation de l'utilisateur :",
          errorMessage
        );
        return throwError(errorMessage);
      })
    );
  }
  updateUser(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
        return throwError(
          "Une erreur est survenue, veuillez réessayer plus tard."
        );
      })
    );
  }
  getCountValidUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/valid/count`);
  }

  getCountInvalidUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/invalid/count`);
  }
}
