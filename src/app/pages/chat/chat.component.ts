// chat.component.ts

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { IMessage } from 'src/app/interfaces/message.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserChatService } from 'src/app/services/UserChat.service';
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


  // Define una propiedad para almacenar la lista de usuarios conectados
  usuariosConectados: any[] = [];
  
  usuarios: IUser[] = [];
  userData: IUser;
  // userData: IUser = {
  //   email:"",
  //   password:"",
  //   nombre:"",
  //   rol:"",
  // };

  mensajes: { usuario: string; mensaje: string }[] = [];
  mensajeNuevo: string = '';
  usuarioNuevo: string = '';
  // conectado: boolean = false;
  // salaSeleccionada: string = 'Conjunta'; 
  salaSeleccionada: string = ''; 
  
  // Variable para almacenar la URL del avatar ingresada por el usuario
  // avatarUrl: string = '';
  avatarUrl: string = '';  

  get connected() {
    return this.signalrService.connected;
  }

  constructor(
    private signalrService: SignalRService,
    private loginService: LoginService,
    private router: Router,
    private usuariosService: UsuariosService,
    private userChatService: UserChatService
  ){
    // this.userData = StorageHelper.getItem<IUser>('usuario')!;
    this.userData = {
      ...StorageHelper.getItem<IUser>('usuario')!,
      avatar: StorageHelper.getAvatar()!,
    };
    this.salaSeleccionada = this.userData.rol!;
  }

    ngOnInit(): void {
        // Llama a connectUser para conectar automáticamente al usuario a la sala conjunta al cargar el componente
        this.signalrService.connectUser();

          // Suscríbete a los cambios en la lista de usuarios conectados
          this.userChatService.usuariosConectados$.subscribe((usuarios) => {
            this.usuarios = usuarios;
            console.log('Usuarios conectados al CHAT:', usuarios);
          });

        this.usuariosService.getUsuarios().subscribe({
          next: (data) => {
            // this.usuarios = data;

        // Actualiza la lista de usuarios conectados en el servicio
      this.userChatService.actualizarUsuariosConectados(data);

         // Recuperar mensajes guardados al iniciar el componente
    this.mensajes = StorageHelper.obtenerMensajes() || [];

    // BORRAR AVATAR PARA VER EL DE POR DEFECTO
    // StorageHelper.removeAvatar();

          },
          error: (err) => {
            alert('Error en el acceso a datos');
          }
        });
        console.log('Datos del usuario:', this.userData);
    }


  ngAfterContentInit(): void {
    this.signalrService.connect();

    //para los sonidos
   // this.sonidoAleatorioConectar();

    this.getMessages();
  }


    sendMessage({text,file}:Omit <IMessage, 'user' | 'avatar' | 'room'>) {
      if (( text.trim() !== '' || file) && this.userData && this.userData.nombre) {
      const texto = `${this.userData.nombre}: ${text}`;
      const message: IMessage = {
        user: `${this.userData.nombre}: `,
        text: text,
        avatar: '',
        room: this.salaSeleccionada, 
        file: null,
        id: this.userData.id,
                
      };
          // Agregar el nuevo mensaje a la lista de mensajes y guardar en el localStorage
          // this.mensajes.push({ usuario: this.userData.nombre, mensaje: text });
         StorageHelper.guardarMensaje([{ usuario: this.userData.nombre, mensaje: text }]);
      
      this.signalrService.sendMessage(message);
      // this.mensajes.push({ usuario: this.userData.nombre, mensaje: this.mensajeNuevo });
        console.log( message);
      this.mensajeNuevo = '';
    }
    
  }
 

  getMessages() {
    this.signalrService.messageSubscription.subscribe({
      next: (message: IMessage) => {
        const usuario = message.user;
        const mensaje = message.text;

        console.log('Nuevo mensaje GET chat component:', message);
        if (usuario === 'Sistema' || usuario === 'Host') {
          alert(message.text);
        }
        // Verifica si el mensaje pertenece a la sala seleccionada
        if (message.room === this.salaSeleccionada) {
          // if (message.room === this.userData.rol) {
            // if (usuario === 'Sistema'|| usuario === 'Host') {
            //   alert(message.text);
            // }
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


  guardarAvatar(): void {
    // Guarda la URL del avatar en el StorageHelper y actualiza el objeto userData
    if (this.avatarUrl.trim() !== 'https://sstc.ac.in/img2/faculty/faculty.jpg') {
      StorageHelper.setAvatar(this.avatarUrl);
      this.userData.avatar = this.avatarUrl;
    }
  }


// + CÓDIGO PARA PONER LOS SONIDOS !!!!!!
  sonidoAleatorioConectar() {
    const sonidos: string[] = [
      '/assets/Sonidos/006150542_prev.mp3',
      //'/Sonidos/siete_caballos_vienen_de_bonanza_chiquito_de_la_calzada.mp3',
      //'/Sonidos/chiquito_de_la_calzada_te_habla_un_hombre_malo_de_la_pradera.mp3',
    ];
  
    const indice: number = Math.floor(Math.random() * sonidos.length);
    const audio: HTMLAudioElement = new Audio(sonidos[indice]);
    audio.volume = 0.1; 
    audio.play();
  }

}
