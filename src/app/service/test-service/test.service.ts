import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { submittedQuestionlogique } from "src/app/Models/submittedQuestionlogique";

@Injectable({
  providedIn: "root",
})
export class TestService {
  private readonly baseUrl = "http://localhost:8070/v2/tests";

  constructor(private http: HttpClient) {}

  createTestLog(
    testSectionUUID: string,
    size: number,
    privateqts: number
  ): Observable<any> {
    const body = {
      testSectionUUID: testSectionUUID,
      size: size,
      privateqts: privateqts,
    };

    console.log("Request sent to the API:", body);

    return this.http
      .post<any>(`${this.baseUrl}/createTestLogic`, null, { params: body })
      .pipe(
        catchError((error) => {
          console.error("Error creating the logic test:", error);
          return throwError(
            "Error creating the logic test. Please try again later."
          );
        })
      );
  }
  getAllTests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tests`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getTestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getTestsByTestSectionUUID(testSectionUUID: string): Observable<any[]> {
    const params = new HttpParams().set("testSectionUUID", testSectionUUID);
    return this.http
      .get<any[]>(`${this.baseUrl}/tests`, { params: params })
      .pipe(
        catchError((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des tests:",
            error
          );
          return throwError(error);
        })
      );
  }
  generateTestReport(
    testId: number,
    submittedQuestions: submittedQuestionlogique[]
  ): Observable<any> {
    const url = `${this.baseUrl}/generate-rapport/${testId}`;

    const body = submittedQuestions.map((item) => ({
      idQuestion: item.idQuestion,
      reponses: item.reponses || [],
    }));

    console.log("body", body);

    return this.http.post<any>(url, body).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la génération du rapport de test :",
          error
        );
        return throwError(
          "Erreur lors de la génération du rapport de test. Veuillez réessayer plus tard."
        );
      })
    );
  }

  generateFreemarkerTestReport(
    testId: number,
    submittedQuestions: submittedQuestionlogique[]
  ): Observable<any> {
    const url = `${this.baseUrl}/generate-freemarker-report/${testId}`;
    const body = submittedQuestions.map((item) => ({
      idQuestion: item.idQuestion,
      reponses: item.reponses || [],
    }));

    return this.http.post(url, body, { responseType: "text" });
  }

  createTestTechnique(testSectionTechId: string): Observable<any> {
    const url = `${this.baseUrl}/createTestTechnique`;
    const params = new HttpParams().set("testSectionTechId", testSectionTechId);
    return this.http.post<any>(url, null, { params: params }).pipe(
      catchError((error) => {
        console.error("Erreur lors de la création du test technique :", error);
        return throwError(
          "Erreur lors de la création du test technique. Veuillez réessayer plus tard."
        );
      })
    );
  }
  submitTest(testId: number): Observable<any> {
    const url = `${this.baseUrl}/submitted/${testId}`;
    return this.http.put<any>(url, {}).pipe(
      catchError((error) => {
        console.error("Erreur lors de la soumission du test :", error);
        return throwError(
          "Erreur lors de la soumission du test. Veuillez réessayer plus tard."
        );
      })
    );
  }
}
