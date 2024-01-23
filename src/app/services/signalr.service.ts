// signalr.service.ts
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { IMessage } from '../interfaces/message.interface';
import { StorageHelper } from '../helpers/storage.helper';
import { HttpClient} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUsuarioChat, IMensajeChat } from '../interfaces/chat';
import { RoomsEnum } from '../interfaces/enums/chat';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private http = inject(HttpClient);
  urlSignalR = environment.urlAPI + 'ChatHub';
  hubConnection!: signalR.HubConnection;
  messageSubscription: Subject<IMensajeChat> = new Subject<IMensajeChat>();
  connected = false;

  constructor() {
    this.connect();
  }

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
          console.log('Conexión iniciada');
          this.connected = true;
          this.listenMessages();
        })
        .catch((err) => console.error('Error al iniciar la conexión: ' + err));
    }
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => {
          this.connected = false;
          console.log('Conexión cerrada');
        })
        .catch((err) => console.error('Error al cerrar la conexión: ', err));
    }
  }

  connectUser() {
    const user: IUsuarioChat | null = StorageHelper.getItem<IUsuarioChat>('usuario');

    if (user) {
      const message: IMensajeChat = {
        // id: userData.id,
        user,
        text: '',
        room: /* user.role ||  */RoomsEnum.Conjunta,
        file: null,
        timestamp: new Date().valueOf(), // UNIX
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
    this.hubConnection.on('GetMessage', (message: IMensajeChat) => {
      this.messageSubscription.next(message);
    });
  }

  sendMessage(message: IMensajeChat) {
    this.hubConnection.send('SendMessage', message);
    // this.messageSubscription.next(message);
    console.log('sendMessage del signalrservice', message);
  }
}
