import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) {}

  findAllCategorias(): Observable<any[]>{
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/categoriaLegislacao`)
  }

  findAllTipoLegislacao(): Observable<any[]>{
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/tipoLegislacao`)
  }

  save(data: any) : Observable<any[]>
  {
    return this.http.post<any[]>(`${API_CONFIG.baseUrl}/legislacao`,data)
  }

  update(data: any, id: number) : Observable<any[]>
  {
    return this.http.put<any[]>(`${API_CONFIG.baseUrl}/legislacao/${id}`,data)
  }

  findAllLegislacao(): Observable<any[]>
  {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/legislacao`)
  }

  delete(id: number): Observable<any> 
  {
    const url = `${API_CONFIG.baseUrl}/legislacao/${id}`;
    return this.http.delete<any>(url)
  }
}
