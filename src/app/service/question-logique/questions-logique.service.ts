import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { questionLog } from "src/app/Models/questionLog";

@Injectable({
  providedIn: "root",
})
export class QuestionLogicService {
  private baseUrl = "http://localhost:8070/v2/questionsLogique";

  constructor(private http: HttpClient) {}
  getQuestionLogiqueById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la récupération de la question logique par ID : ",
          error
        );
        return throwError(error);
      })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la récupération de toutes les questions logiques : ",
          error
        );
        return throwError(error);
      })
    );
  }

  addQuestionLogic(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, formData).pipe(
      catchError((error) => {
        console.error("Erreur lors de l'ajout de la question logique :", error);
        return throwError(error);
      })
    );
  }

  deleteQuestionLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la suppression de la question logique : ",
          error
        );
        return throwError(error);
      })
    );
  }

  getQuestionLogicById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la récupération de la question logique par ID : ",
          error
        );
        return throwError(error);
      })
    );
  }
  getTypeNamesAndDiff(
    type: string,
    difficulty: string
  ): Observable<questionLog[]> {
    let params = new HttpParams();
    if (type) {
      params = params.set("type", type);
    }
    if (difficulty) {
      params = params.set("difficulty", difficulty);
    }

    return this.http.get<questionLog[]>(`${this.baseUrl}/typesAndDiff`, {
      params,
    });
  }

  countLogiqueQuestions(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/logique/count`);
  }
}
