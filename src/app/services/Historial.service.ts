import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHistorial } from '../interfaces/historial.interface';


@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private urlAPI= 'https://localhost:7217/api'; 

  constructor(private http: HttpClient) { }

  getHistorialChat(room: string): Observable<IHistorial[]> {
    const url = `${this.urlAPI}/Salas/historial/${room}`; 
    return this.http.get<IHistorial[]>(url);
  }

  // getHistorialChat(): Observable<IMessage[]> {
  //   const headers = this.getHistorialChat();
  //   return this.http.get<IMessage[]>(`${this.urlAPI}/Historial`, { headers: headers });
 
  // }



  getSalasDisponibles(): Observable<string[]> {
    const url = `${this.urlAPI}/Salas/salas-disponibles`;
    return this.http.get<string[]>(url);
  }
}
