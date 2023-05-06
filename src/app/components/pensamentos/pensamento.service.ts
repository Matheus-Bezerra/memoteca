import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Pensamento } from './pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private _http: HttpClient) { }

  listar(pagina: number, filtro?: string) : Observable<Pensamento[]> {
    const itensPorPagina = 6
    let params = new HttpParams().set("_page", pagina).set("_limit", itensPorPagina)

    if(filtro && filtro?.trim().length > 2) {
      params = params.set("q", filtro)
    }
    return this._http.get<Pensamento[]>(this.API, {params})
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this._http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this._http.put<Pensamento>(url, pensamento)
  }

  excluir(idPensamento: number): Observable<Pensamento> {
    const url = `${this.API}/${idPensamento}`
    return this._http.delete<Pensamento>(url)
  }

  buscarPorId(idPensamento: number): Observable<Pensamento> {
    const url = `${this.API}/${idPensamento}`
    return this._http.get<Pensamento>(url)
  }
}
