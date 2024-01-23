import { Component, OnInit, AfterContentInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { IMessage } from 'src/app/interfaces/message.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserChatService } from 'src/app/services/UserChat.service';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { LoginService } from 'src/app/services/auth.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { __values } from 'tslib';
import { IMensajeChat, IUsuarioChat } from 'src/app/interfaces/chat';
import { RolesEnum, RoomsEnum } from 'src/app/interfaces/enums/chat';
import { MessageInputComponent } from '../../components/message-input/message-input.component';
import { FormsModule } from '@angular/forms';
import {
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgFor,
} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgFor,
    FormsModule,
    MessageInputComponent,
  ],
  providers: [
    SignalRService,
    LoginService,
    UsuariosService,
    UserChatService,
    Router,
  ],
})
export class ChatComponent implements OnInit, AfterContentInit {
  private signalrService = inject(SignalRService);
  private loginService = inject(LoginService);
  private usuariosService = inject(UsuariosService);
  private userChatService = inject(UserChatService);
  private router = inject(Router);

  roles = RolesEnum;
  rooms = [
    { display: 'Sala conjunta', value: RoomsEnum.Conjunta },
    { display: 'Sala 1', value: RoomsEnum.Sala1 },
    { display: 'Sala 2', value: RoomsEnum.Sala2 },
    { display: 'Sala 3', value: RoomsEnum.Sala3 },
    { display: 'Sala 4', value: RoomsEnum.Sala4 },
    { display: 'Sala 5', value: RoomsEnum.Sala5 },
    { display: 'Sala 6', value: RoomsEnum.Sala6 },
  ];
  user!: IUsuarioChat;
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
  salaSeleccionada!: RoomsEnum;

  // Variable para almacenar la URL del avatar ingresada por el usuario
  // avatarUrl: string = '';
  avatarUrl: string = '';

  get connected() {
    return this.signalrService.connected;
  }

  constructor() {
    this.userData = {
      ...StorageHelper.getItem<IUser>('usuario')!,
      avatar: StorageHelper.getAvatar()!,
    };
    // this.salaSeleccionada = this.userData.rol!;
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
        this.mensajes = StorageHelper.obtenerMensajes();

        // BORRAR AVATAR PARA VER EL DE POR DEFECTO
        // StorageHelper.removeAvatar();
      },
      error: (err) => {
        alert('Error en el acceso a datos');
      },
    });
    console.log('Datos del usuario:', this.userData);
  }

  ngAfterContentInit(): void {
    this.signalrService.connect();

    //para los sonidos
    // this.sonidoAleatorioConectar();

    this.getMessages();
  }

  sendMessage({ text, file }: { text: string; file: File | null }) {
    if (this.user) {
      const message: IMensajeChat = {
        user: this.user,
        text,
        file,
        timestamp: Date.now(),
      };
      // Agregar el nuevo mensaje a la lista de mensajes y guardar en el localStorage
      // this.mensajes.push({ usuario: this.userData.nombre, mensaje: text });
      StorageHelper.guardarMensaje([
        { usuario: this.userData.nombre ?? '', mensaje: text },
      ]);

      this.signalrService.sendMessage(message);
      // this.mensajes.push({ usuario: this.userData.nombre, mensaje: this.mensajeNuevo });
      console.log(message);
      this.mensajeNuevo = '';
    }
  }

  getMessages() {
    this.signalrService.messageSubscription.subscribe({
      next: (message: IMensajeChat) => {
        const usuario = message.user;
        const mensaje = message.text;

        console.log('Nuevo mensaje GET chat component:', message);

      },
      error: (err: any) => {
        console.error('Error en chat.component.ts:', err);
      },
      complete: () => {
        console.log('Conexión cerrada en chat.component.ts');
      },
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  moverSala(sala: RoomsEnum): void {
    // this.userData.rol = sala;
    this.salaSeleccionada = sala;
  }

  guardarAvatar(): void {
    // Guarda la URL del avatar en el StorageHelper y actualiza el objeto userData
    if (
      this.avatarUrl.trim() !== 'https://sstc.ac.in/img2/faculty/faculty.jpg'
    ) {
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
