// signalr.service.ts
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { StorageHelper } from '../helpers/storage.helper';
import { Injectable, inject } from '@angular/core';
import { IUsuarioChat, IMensajeChat } from '../interfaces/chat';
import { ChatEventEnum, RoomsEnum } from '../interfaces/enums/chat';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private userService = inject(UserService<IUsuarioChat>);
  urlSignalR = environment.urlAPI + 'ChatHub';
  hubConnection!: signalR.HubConnection;
  private messageSubject = new BehaviorSubject<IMensajeChat>(null!);
  message$ = this.messageSubject.asObservable();
  private connectedSubject = new BehaviorSubject<boolean>(false);
  connected$ = this.connectedSubject.asObservable();

  connect() {
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.urlSignalR, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log({msg:'Conexión iniciada'});
          this.connectedSubject.next(true);
          this.getMessage();
        })
        .catch((err) => console.error({msg: 'Error al iniciar la conexión', err}));
    }
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => {
          this.connectedSubject.next(false);
          console.log({msg: 'Conexión cerrada'});
        })
        .catch((err) => console.error({msg: 'Error al cerrar la conexión', err}));
    }
  }

  connectUser() {
    const user: IUsuarioChat | null = StorageHelper.getItem<IUsuarioChat>('usuario');

    if (user) {
      const message: IMensajeChat = {
        // id: userData.id,
        user,
        text: '',
        file: null,
        timestamp: Date.now(), // UNIX
      };
      this.hubConnection.send(ChatEventEnum.ConnectUser, message);
    }
  }

  listenConnectionClosed() {
    this.hubConnection.onclose((err) =>
      console.error({msg: 'Conexión cerrada', err})
    )
  }

  getMessage() {
    this.hubConnection.on(ChatEventEnum.GetMessage, (message: IMensajeChat) => {
      this.messageSubject.next(message);
    });
  }

  sendMessage(message: IMensajeChat) {
    this.hubConnection.send(ChatEventEnum.SendMessage, message);
    this.messageSubject.next(message);
    console.log({msg:'Mensaje enviado', message});
  }
}
