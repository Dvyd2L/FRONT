// chat.component.ts

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { IMessage } from 'src/app/interfaces/message.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { StorageHelper } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentInit {


  usuarios: IUser[] = [];

  userData: IUser = {
    email:"",
    password:"",
    nombre:"",
    rol:"",
  };

  mensajes: { usuario: string; mensaje: string }[] = [];
  mensajeNuevo: string = '';
  usuarioNuevo: string = '';
  // conectado: boolean = false;
  // salaSeleccionada: string = 'Conjunta'; 
  salaSeleccionada: string = ''; 
 

  get connected() {
    return this.signalrService.connected;
  }



  constructor(
    private signalrService: SignalRService,
    private loginService: LoginService,
    private router: Router,
    private usuariosService: UsuariosService
  ){
    this.userData = StorageHelper.getItem<IUser>('usuario')!;
    this.salaSeleccionada = this.userData.rol!;
  }

  ngOnInit(): void {
    console.log('Datos del usuario:', this.userData);

        // Llama a connectUser para conectar automáticamente al usuario a la sala conjunta al cargar el componente
        this.signalrService.connectUser();

        this.usuariosService.getUsuarios().subscribe({
          next: (data) => {
            this.usuarios = data;
          },
          error: (err) => {
            alert('Error en el acceso a datos');
          }
        });

  }





  ngAfterContentInit(): void {
    this.signalrService.connect();
    this.getMessages();
  }

  // connect() {
  //   this.signalrService.connect();
  //   this.conectado = true;
  //   this.mensajes.push({ usuario: 'Sistema', mensaje: 'Conectado' });
  // }

  // disconnect() {
  //   this.signalrService.disconnect();
  //   this.conectado = false;
  //   this.mensajes.push({ usuario: 'Sistema', mensaje: 'Desconectado' });
  // }



    sendMessage({text,file}:Omit <IMessage, 'user' | 'avatar' | 'room'>) {
      if (( text.trim() !== '' || file) && this.userData && this.userData.nombre) {
      const texto = `${this.userData.nombre}: ${text}`;
      const message: IMessage = {
        user: "",
        text: texto,
        avatar: "",
        room: this.salaSeleccionada, 
        file: null,

      };
      this.signalrService.sendMessage(message);
      // this.mensajes.push({ usuario: this.userData.nombre, mensaje: this.mensajeNuevo });
      this.mensajeNuevo = '';
    }
  }

  // sendMessage() {
  //   if (this.mensajeNuevo.trim() !== '' && this.userData && this.userData.nombre) {
  //     const texto = `${this.userData.nombre}: ${this.mensajeNuevo}`;
  //     const message: IMessage = {
  //       user: "",
  //       text: texto,
  //       avatar: "",
  //       room: this.salaSeleccionada,
  //       file: null,

  //     };
  //     // console.log('Sending message:', message); 
  //     this.signalrService.sendMessage(message);
  //     // this.mensajes.push({ usuario: this.userData.nombre, mensaje: this.mensajeNuevo });
  //     this.mensajeNuevo = '';
  //   }
  // }


  
    // cambiar de sala
    // changeRoom() {
    //   if (this.connected) {
    //     // this.signalrService.changeRoom(this.salaSeleccionada);
    //     this.signalrService.changeRoom(this.userData.rol!);

    //   // this.signalrService.connect();
    // }}
 

  getMessages() {
    this.signalrService.messageSubscription.subscribe({
      next: (message: IMessage) => {
        const usuario = message.user;
        const mensaje = message.text;

        console.log('Nuevo mensaje:', message);

        // Verifica si el mensaje pertenece a la sala seleccionada
        if (message.room === this.salaSeleccionada) {
          // if (message.room === this.userData.rol) {

          this.mensajes.push({ usuario, mensaje });

          console.log('Mensajes actuales:', this.mensajes);
        }  
      },
      error: (err: any) => {
        console.error('Error en chat.component.ts:', err);
      },
      complete: () => {
        console.log('Conexión cerrada en chat.component.ts');
      }
    });
  }


  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }


  moverSala(sala: string): void {
    // this.userData.rol = sala;
    this.salaSeleccionada = sala;
  }

  moverSala2(): void {
    // this.userData = StorageHelper.getItem<IUser>('usuario')!;
    this.salaSeleccionada = StorageHelper.getItem<IUser>('usuario')?.rol!;
  }

}
