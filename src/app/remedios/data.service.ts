import { Injectable } from '@angular/core';
import { Clremedios } from './models/CLremedios';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/remedios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient) { }

  // Controla y enviará un mensaje a consola para todos los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  addRemedio(remedios: Clremedios): Observable<Clremedios> {
    console.log("añadiendo remedio : ", remedios);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<Clremedios>(apiUrl, remedios, httpOptions)
      .pipe(  // Tubería
        // tap intersecta la respuesta si no hay error
        tap((producto: Clremedios) => console.log('added remedio w/:', remedios)),
        // En caso de que ocurra Error
        catchError(this.handleError<Clremedios>('addRemedio'))
      );
  }

  // Obtenemos todos los Productos
  getRemedios(): Observable<Clremedios[]> {
    console.log("getProducts ()");
    return this.http.get<Clremedios[]>(apiUrl+"/remedios")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  //obtenemos remedio por id
  getRemedio(id: number): Observable<Clremedios> {
    //const url = '${apiUrl}/${id}';
    //return this.http.get<Producto>(url).pipe(
    console.log("getProduct ID:" + id);
    return this.http.get<Clremedios>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched product id=${id}')),
        catchError(this.handleError<Clremedios>('getProduct id=${id}'))
      );
  }
  
  deleteRemedios(id: number): Observable<Clremedios> {
    //const url = '${apiUrl}/${id}';
    //return this.http.delete<Producto>(url, httpOptions).pipe(
    return this.http.delete<Clremedios>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted product id=${id}')),
        catchError(this.handleError<Clremedios>('deleteProduct'))
      );
  }

  updateRemedios(id: number, remedios: Clremedios): Observable<Clremedios> {
    return this.http.put<Clremedios>(apiUrl + "/" + id, remedios, httpOptions)
      .pipe(
        tap(_ => console.log('updated product id=${id}')),
        catchError(this.handleError<any>('updateProduct'))
      );
  }

}
