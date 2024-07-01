import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { TestSectionLogique } from "src/app/Models/TestSectionLogique";
import { questionLog } from "src/app/Models/questionLog";

@Injectable({
  providedIn: "root",
})
export class TestSectionLogiqueService {
  private baseUrl = "http://localhost:8070/v2/test-Sections-logique";

  constructor(private http: HttpClient) {}

  getTestSectionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllTestSection(): Observable<TestSectionLogique[]> {
    return this.http.get<TestSectionLogique[]>(`${this.baseUrl}/all`);
  }

  getTestSectionsByUserUUID(
    userUUID: string
  ): Observable<TestSectionLogique[]> {
    return this.http
      .get<TestSectionLogique[]>(`${this.baseUrl}/BYUser?userUUID=${userUUID}`)
      .pipe(catchError(this.handleError));
  }

  createTestSection(
    testSectionLogiqueDto: TestSectionLogique,
    user_uuid: string
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/add?user_uuid=${user_uuid}`,
      testSectionLogiqueDto
    );
  }

  updateTestSection(
    id: number,
    testSectionLogiqueDto: TestSectionLogique
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, testSectionLogiqueDto);
  }

  deleteTestSection(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAllTestSection(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAll`);
  }

  getPrivateQuestionsByTestSectionId(
    testSectionId: number
  ): Observable<questionLog[]> {
    return this.http
      .get<questionLog[]>(
        `${this.baseUrl}/test-section/${testSectionId}/private-questions`
      )
      .pipe(catchError(this.handleError));
  }
  filterTestSections(
    experience: string,
    difficulty: string
  ): Observable<TestSectionLogique[]> {
    let params = new HttpParams();
    if (experience) {
      params = params.set("experience", experience);
    }
    if (difficulty) {
      params = params.set("difficulty", difficulty);
    }
    return this.http.get<TestSectionLogique[]>(
      `${this.baseUrl}/testSections/filter`,
      {
        params,
      }
    );
  }
  private handleError(error: any) {
    console.error("An error occurred:", error);
    return throwError("Something went wrong; please try again later.");
  }

  createPrivateQuestionLogique(
    testSectionId: number,
    formData: FormData
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logical_private_question?testSectionId=${testSectionId}`,
      formData
    );
  }
  getTestSectionByUUID(testSectionUUID: string): Observable<any[]> {
    const url = `${this.baseUrl}/testSectionuuid/${testSectionUUID}`;
    return this.http.get<any[]>(url);
  }
  countTestSectionsByUserUUID(userUUID: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${userUUID}`);
  }
  getSommeQuestionsPrivees(userUUID: string): Observable<number> {
    const url = `${this.baseUrl}/private-questions-logic-sum/${userUUID}`;
    return this.http.get<number>(url).pipe(catchError(this.handleError));
  }
}
