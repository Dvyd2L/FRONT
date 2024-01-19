import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; // Importa Subject de RxJS
import { environment } from 'src/environments/environment';
import { ITokenInfo, IUser } from '../interfaces/user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlAPI = environment.urlAPI;

  // Crea un Subject para el evento de inicio de sesión exitoso
  private loginSuccessSubject = new Subject<void>();

  // Expone el Subject como un observable
  public onLoginSuccess = this.loginSuccessSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(usuario: IUser): Observable<ITokenInfo> {
    return this.http.post<ITokenInfo>(this.urlAPI + '/Usuario/login', usuario)
      .pipe(
        // Utiliza el operador tap para emitir el evento después de un inicio de sesión exitoso
        tap(() => {
          this.loginSuccessSubject.next();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }
}
