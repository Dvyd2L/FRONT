import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITokenInfo } from '../interfaces/user.interface';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { SignalRService } from './signalr.service';
import { IUsuarioChat } from '../interfaces/chat';
import { StorageHelper } from '../helpers/storage.helper';
import { StorageKeyEnum } from '../interfaces/enums/chat';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userService = inject(UserService<IUsuarioChat>);
  private signalrService = inject(SignalRService);
  private urlAPI = environment.urlAPI;

  public register(registerData: any) {
    return this.http.post(this.urlAPI + '/Usuario/register', registerData);
  }

  public login(loginData: IUsuarioChat): Observable<ITokenInfo> {
    return this.http
      .post<ITokenInfo>(this.urlAPI + '/Usuario/login', loginData)
      .pipe(
        // Utiliza el operador tap para emitir el evento después de un inicio de sesión exitoso
        tap((response: ITokenInfo) => {
          // Guarda el token en el almacenamiento local después de un inicio de sesión exitoso
          StorageHelper.setItem(StorageKeyEnum.Token, response.token);

          // Almacena el usuario en el servicio después de un inicio de sesión exitoso
          this.userService.updateUser(loginData);

          // Conecta al servidor SignalR después de un inicio de sesión exitoso
          this.signalrService.connect();
        })
      );
  }

  public logout(): void {
    // Elimina el usuario almacenado al cerrar sesión
    this.userService.clearUser();

    // Elimina el token almacenado al cerrar sesión
    StorageHelper.removeItem(StorageKeyEnum.Token);

    // Desconecta del servidor SignalR
    this.signalrService.disconnect();
  }
}
