// signalr.service.ts

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, HubConnection, HttpTransportType } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { IMessage } from '../interfaces/message.interface';
import { ITokenInfo, IUser } from '../interfaces/user.interface';
import { StorageHelper } from './localstorage.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  urlSignalR = environment.urlAPI + "ChatHub";
  hubConnection!: signalR.HubConnection;
  messageSubscription: Subject<IMessage> = new Subject<IMessage>();
  connected = false;

  constructor(public http: HttpClient) {
    this.connect();
  }

  connect() {
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.urlSignalR, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Conexión iniciada');
          this.connected = true;
          this.listenMessages();
        })
        .catch((err) => console.error('Error al iniciar la conexión: ' + err));
    }
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {

        this.connected = false;
        console.log('Conexión cerrada');
      }).catch((err) => console.error('Error al cerrar la conexión: ', err));
    }
  }

  connectUser() {
    const userData: IUser | null = StorageHelper.getItem<IUser>('usuario');

    if (userData) {
      const message: IMessage = {
        id: userData.id,
        user: userData.nombre || '',
        text: '',
        room: userData.rol || 'Conjunta',
        avatar:userData.avatar??'',
        file: null,
        timestamp: new Date(),
      };
      this.hubConnection.send('ConnectUser', message);
    }
  }

  listenConnectionClosed() {
    this.hubConnection.onclose((error) => {
      console.error('Conexión cerrada:', error);
    });
  }

  listenMessages() {
    this.hubConnection.on('GetMessage', (message: IMessage) => {
      this.messageSubscription.next(message);
    });
  }

  sendMessage(message: IMessage) {
    this.hubConnection.send('SendMessage', message);
    // this.messageSubscription.next(message); 
    console.log('sendMessage del signalrservice', message)
  }
}
