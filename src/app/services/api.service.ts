import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiEndpointEnum } from '../interfaces/enums/chat';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private urlAPI = environment.urlAPI + 'api';

  public get<T>(endpoint: ApiEndpointEnum): Observable<T> {
    return this.http.get<T>(`${this.urlAPI}/${endpoint}`);
  }

  public getById<Tid, TResponse>(
    id: Tid,
    endpoint: ApiEndpointEnum
  ): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.urlAPI}/${endpoint}/${id}`);
  }

  public create<TData, TResponse>(
    data: TData,
    endpoint: ApiEndpointEnum
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.urlAPI}/${endpoint}`, data);
  }

  public update<TData, Tid, TResponse>(
    data: TData,
    id: Tid,
    endpoint: ApiEndpointEnum
  ): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.urlAPI}/${endpoint}/${id}`, data);
  }

  public delete<Tid, TResponse>(
    id: Tid,
    endpoint: ApiEndpointEnum
  ): Observable<TResponse> {
    return this.http.delete<TResponse>(`${this.urlAPI}/${endpoint}/${id}`);
  }
}
