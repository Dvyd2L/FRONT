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

  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) {}

  login(usuario: IUser): Observable<ITokenInfo> {
    return this.http.post<ITokenInfo>(this.urlAPI + '/Usuario/login', usuario)
      .pipe(
        // Utiliza el operador tap para emitir el evento después de un inicio de sesión exitoso
        tap((tokenInfo: ITokenInfo) => {
          // Almacena el usuario en el servicio después de un inicio de sesión exitoso
          this.currentUser = { email: usuario.email, token: tokenInfo.token, rol: tokenInfo.rol };
          this.loginSuccessSubject.next();
        })
      );
  }

  logout(): void {
    // Elimina el usuario almacenado al cerrar sesión
    this.currentUser = null;
    localStorage.removeItem('usuario');
  }

  getUserLogged(): IUser | null {
    // Devuelve el usuario almacenado
    return this.currentUser;
  }

  getUserEmail(): string | null {
    // Devuelve el email del usuario almacenado
    return this.currentUser ? this.currentUser.email : null;
  }

  getUserRole(): string | null {
    // Devuelve el rol del usuario almacenado
    return this.currentUser && this.currentUser.rol ? this.currentUser.rol : null;
  }
}
