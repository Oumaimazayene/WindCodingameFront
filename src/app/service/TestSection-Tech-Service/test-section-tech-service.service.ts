import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { questionTech } from "src/app/Models/questionTech";
import { TestSectionTech } from "src/app/Models/testSection-Tech";

@Injectable({
  providedIn: "root",
})
export class TestSectionTechServiceService {
  private baseUrl = "http://localhost:8070/v2/test-Sections-Tech";

  constructor(private http: HttpClient) {}
  getTestSectionsByUserUUID(userUUID: string): Observable<TestSectionTech[]> {
    const url = `${this.baseUrl}/user/${userUUID}`;
    return this.http.get<TestSectionTech[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = `Erreur : ${error.error.message}`;
        } else {
          // Erreur côté serveur
          errorMessage = `Erreur du serveur : code ${error.status}, message : ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
  filterTestSections(
    experience: string,
    difficulty: string
  ): Observable<TestSectionTech[]> {
    let params = new HttpParams();
    if (experience) {
      params = params.set("experience", experience);
    }
    if (difficulty) {
      params = params.set("difficulty", difficulty);
    }
    return this.http.get<TestSectionTech[]>(
      `${this.baseUrl}/testSectionsTech/filter`,
      {
        params,
      }
    );
  }
  createTestSection(testSectionTech: any, userUUID: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, testSectionTech, {
      params: { user_uuid: userUUID },
    });
  }

  getTestSectionById(id: number): Observable<TestSectionTech> {
    return this.http.get<TestSectionTech>(`${this.baseUrl}/${id}`);
  }

  updateTestSection(
    id: number,
    testSectionTech: TestSectionTech
  ): Observable<TestSectionTech> {
    return this.http.put<TestSectionTech>(
      `${this.baseUrl}/${id}`,
      testSectionTech
    );
  }

  deleteTestSection(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getAllTestSections(): Observable<TestSectionTech[]> {
    return this.http.get<TestSectionTech[]>(`${this.baseUrl}/all`);
  }
  private handleError(error: any) {
    console.error("An error occurred:", error);
    return throwError("Something went wrong; please try again later.");
  }
  getPrivateQuestionsByTestSectionId(
    testSectionId: number
  ): Observable<questionTech[]> {
    return this.http
      .get<questionTech[]>(
        `${this.baseUrl}/test-section-Tech/${testSectionId}/private-questions`
      )
      .pipe(catchError(this.handleError));
  }

  createPrivateQuestionTechnique(
    questionTechDTo: any,
    testSectionId: number
  ): Observable<any> {
    const url = `${this.baseUrl}/createPrivateQuestionTechnique?testSectionId=${testSectionId}`;
    return this.http
      .post<any>(url, questionTechDTo)
      .pipe(catchError(this.handleError));
  }

  getPrivateQuestionsSumByUserUUID(userUUID: string): Observable<number> {
    const url = `${this.baseUrl}/private-questions-sum/${userUUID}`;
    return this.http.get<number>(url);
  }
}
