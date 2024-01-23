import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ITokenInfo } from '../interfaces/user.interface';
import { StorageHelper } from '../helpers/storage.helper';
import { EndpointEnum, StorageKeyEnum } from '../interfaces/enums/chat';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private urlAPI = environment.urlAPI;

  public get<T>(endpoint: EndpointEnum): Observable<T> {
    const headers = this.getTokenHeader();
    return this.http.get<T>(`${this.urlAPI}/${endpoint}`, { headers });
  }

  public getById<Tid, TResponse>(id: Tid): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.urlAPI}/Usuario/${id}`);
  }

  public create<TData, TResponse>(data: TData): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.urlAPI}/Usuario`, data);
  }

  public update<TData, Tid, TResponse>(data: TData, id: Tid): Observable<TResponse> {
    const headers = this.getTokenHeader();
    return this.http.put<TResponse>(`${this.urlAPI}/Usuario/${id}`, data, { headers });
  }

 public delete<Tid, TResponse>(id: Tid): Observable<TResponse> {
    const headers = this.getTokenHeader();
    return this.http.delete<TResponse>(`${this.urlAPI}/Usuario/${id}`, { headers });
  }

  private getTokenHeader(): HttpHeaders {
    const token = StorageHelper.getItem<ITokenInfo>(StorageKeyEnum.Token)?.token;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    
    return headers;
  }
}