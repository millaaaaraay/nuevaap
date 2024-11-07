// data.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ClUsuario } from '../auth/ClUsuario';
import { Clremedios } from './models/CLremedios';
// URL del JSON Server
const apiUrl = "http://localhost:3000/remedios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  /**
   * Maneja los errores de las operaciones HTTP.
   * @param operation Nombre de la operación que se está realizando
   * @param result Resultado por defecto en caso de error
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error); // Muestra el error en consola
      return of(result as T); // Retorna el resultado por defecto
    };
  }

  /**
   * Añade un nuevo remedio al servidor.
   * @param remedios Objeto de tipo Clremedios
   */
  addRemedio(remedios: Clremedios): Observable<Clremedios> {
    console.log("Añadiendo remedio:", remedios); // Verifica el contenido aquí
    return this.http.post<Clremedios>(apiUrl, '/remedios', httpOptions)
      .pipe(
        tap((producto: Clremedios) => console.log('Remedio añadido:', producto)),
        catchError(this.handleError<Clremedios>('addRemedio'))
      );
  }

  /**
   * Obtiene todos los remedios del servidor.
   */
  getRemedios(): Observable<Clremedios[]> {
    console.log("Obteniendo todos los remedios...");
    return this.http.get<Clremedios[]>(apiUrl)
      .pipe(
        tap(remedios => console.log('Remedios obtenidos:', remedios)),
        catchError(this.handleError('getRemedios', []))
      );
  }

  /**
   * Obtiene un remedio específico por ID.
   * @param id ID del remedio
   */
  getRemedio(id: number): Observable<Clremedios> {
    console.log("Obteniendo remedio con ID:", id);
    return this.http.get<Clremedios>(`${apiUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Remedio obtenido con ID=${id}`)),
        catchError(this.handleError<Clremedios>(`getRemedio id=${id}`))
      );
  }

  /**
   * Elimina un remedio del servidor por ID.
   * @param id ID del remedio a eliminar
   */
  deleteRemedios(id: number): Observable<Clremedios> {
    return this.http.delete<Clremedios>(`${apiUrl}/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`Remedio eliminado con ID=${id}`)),
        catchError(this.handleError<Clremedios>('deleteRemedio'))
      );
  }

  /**
   * Actualiza un remedio existente.
   * @param id ID del remedio a actualizar
   * @param remedios Objeto de tipo Clremedios con los nuevos valores
   */
  updateRemedios(id: number, remedios: Clremedios): Observable<Clremedios> {
    return this.http.put<Clremedios>(`${apiUrl}/${id}`, remedios, httpOptions)
      .pipe(
        tap(_ => console.log(`Remedio actualizado con ID=${id}`)),
        catchError(this.handleError<any>('updateRemedio'))
      );
  }
  getUsuarios(): Observable<ClUsuario[]> {
    console.log("Obteniendo usuarios...");
    return this.http.get<ClUsuario[]>(apiUrl + "/usuarios")
      .pipe(
        tap(usuarios => console.log('Usuarios obtenidos')), // Loguea que se obtuvieron los usuarios
        catchError(this.handleError('getUsuarios', [])) // Maneja errores
      );
  }

  // Obtener un usuario por correo
  getUsuario(correo: string): Observable<ClUsuario[]> {
    console.log('Obteniendo usuario: ', correo);
    return this.http.get<ClUsuario[]>(apiUrl + "/usuarios?correo=" + correo)
      .pipe(
        tap(_ => console.log(`Usuario obtenido correo=${correo}`)), // Loguea que se obtuvo el usuario
        catchError(this.handleError<ClUsuario[]>('getUsuario')) // Maneja errores
      );
  }

}
