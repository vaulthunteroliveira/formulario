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

  save(data: any) : void
  {
    this.http.post(`${API_CONFIG.baseUrl}/legislacao`,data)
      .subscribe(e => console.log(e));
  }

  findAllLegislacao(): Observable<any[]>{
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/legislacao`)
  }

}
