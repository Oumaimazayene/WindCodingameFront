import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CandidatServiceService {
  private readonly baseUrl = "http://localhost:8070/v2/candidats";

  constructor(private http: HttpClient) {}

  sendEmailToCandidate(
    testId: number,
    email: string,
    firstName?: string,
    lastName?: string
  ) {
    const formData = new FormData();
    formData.append("testId", testId.toString());
    formData.append("email", email);

    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }

    return this.http.post(`${this.baseUrl}/evaluatetest`, formData);
  }
  getAllCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
  getCandidatesByUserUUID(userUUID: string): Observable<any[]> {
    const url = `${this.baseUrl}/${userUUID}/candidates`;
    return this.http.get<any[]>(url);
  }
}
