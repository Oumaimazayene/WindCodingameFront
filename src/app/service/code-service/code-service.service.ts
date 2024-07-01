import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CodeServiceService {
  private baseUrl = "http://localhost:8070/app";

  constructor(private http: HttpClient) {}

  runScript(
    language: string,
    version: string,
    script: string,
    stdin: string
  ): Observable<any> {
    console.log("Sending request with language:", language);
    console.log("Sending request with version:", version);
    console.log("Sending request with script:", script);
    console.log("Sending request with stdin:", stdin);

    const body = { language, version, script, stdin };

    console.log("Sending request body:", body);

    const request = this.http.post<any>(`${this.baseUrl}/run`, body);

    request.subscribe({
      next: (response) => {
        console.log("Received response:", response);
      },
      error: (error) => {
        console.error("Error occurred:", error);
      },
      complete: () => {
        console.log("Request completed.");
      },
    });

    return request;
  }
}
