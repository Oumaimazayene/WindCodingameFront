import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Type } from "src/app/Models/type";

@Injectable({
  providedIn: "root",
})
export class TypeService {
  private apiUrl = "http://localhost:8070/v2/types";

  constructor(private http: HttpClient) {}

  getTypeById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/${id}`);
  }

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.apiUrl}/types`);
  }

  createType(newType: Type): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, newType, {
      headers: { "Content-Type": "application/json" },
    });
  }
  deleteType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  updateType(id: number, updatedType: Type): Observable<Type> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.put<Type>(url, updatedType, { headers: headers });
  }
}
