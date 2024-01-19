// signalr.service.ts

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, HubConnection, HttpTransportType} from '@microsoft/signalr';
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
  urlAPI = environment.urlAPI;


  // userData: IUser = {
  //   email:"",
  //   password:"",
  //   nombre:"",
  //   rol:"",
  // };

  
  urlSignalR = environment.urlAPI;
  hubConnection!: signalR.HubConnection;
  messageSubscription: Subject<IMessage> = new Subject<IMessage>();
  connected = false;

  constructor(public http: HttpClient) {
    this.connect();
  }

  connect() {
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7217/ChatHub', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        // .configureLogging(signalR.LogLevel.Debug) // Agrega esta línea para habilitar la depuración
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Conexión iniciada');
          this.connected = true;
          this.listenMessages();

      //         // PRUEBAS Llama al nuevo método para obtener la lista de usuarios conectados
      //         this.hubConnection.send('GetConnectedUsers');
      //             // Verifica si se está llamando correctamente
      // console.log('Método GetConnectedUsers llamado');
        })
        .catch((err) => console.log('Error al iniciar la conexión: ' + err));
    }
  }



  connectUser() {
    const userData: IUser | null = StorageHelper.getItem<IUser>('usuario');
    
    if (userData) {
      const message: IMessage = {
        user: userData.nombre || '',
        text:'',
        // room: 'Conjunta', 
        room: userData.rol || '',
        avatar: '', 
        file: null,
      };



      this.hubConnection.send('ConnectUser', message);

 
    }
  }
 
  // changeRoom(room: string) {
  //   this.hubConnection.send('ChangeRoom', room);
  // }


  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
       
        this.connected = false;
        console.log('Conexión cerrada');
      }).catch((err) => console.error('Error al cerrar la conexión: ', err));
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
  }



  // PRUEBAS

  // listenConnectedUsers() {
  //   this.hubConnection.on('GetUsers', (users: IUser[]) => {
  //     console.log('Usuarios conectados:', users);
  //   });
  // }




}
