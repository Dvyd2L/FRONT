import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { UserChatService } from 'src/app/services/UserChat.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuario: IUser = {
    nombre: '',
    email: '',
    password: '',
    rol: '',
    id:0
  };

  usuarios: IUser[] = [];

  constructor(private usuariosService: UsuariosService, private loginService: LoginService, private router: Router,
    private userChatService: UserChatService,) {}


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        
             // Agrega un console.log para verificar que la lista de usuarios se obtuvo correctamente
      console.log('Usuarios obtenidos en UsuariosComponent:', data);
              // Actualiza la lista de usuarios conectados en el servicio
      this.userChatService.actualizarUsuariosConectados(data);
      
      },
      error: (err) => {
        alert('Error en el acceso a datos');
      }
    });
  }

  addUsuarios() {
    this.usuariosService.addUsuarios(this.usuario).subscribe({
      next: (data) => {
        this.usuario.nombre = '';
        this.usuario.email = '';
        this.usuario.password = '';
        this.usuario.rol = '';
        alert('Alta realizada con éxito');
      },
      error: (err) => {
        alert('ERROR: El email ya está en uso, o el servidor ha dejado de responder');
      },
      complete: () => {
        this.getUsuarios();
      }
    });
  }


  updateUsuarios(usuario: IUser): void {
    const confirmacion = confirm('¿Estás seguro de que deseas actualizar este usuario?');
    if (confirmacion) {
      this.usuariosService.updateUsuarios(usuario).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
        },
        error: () => {
          alert('Error al actualizar el usuario');
        }
      });
    }
  }
  

  deleteUsuarios(usuario: IUser): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este usuario?');
      if (confirmacion) {
      this.usuariosService.deleteUsuarios(usuario).subscribe({
        next: (response) => {
          console.log('Usuario eliminado correctamente', response);
          alert('Usuario eliminado correctamente');  
        },
        error: (error) => {
          console.error('Error al eliminar el usuario', error);
          alert('Error al eliminar el usuario');
        },
        complete: () => {
          this.getUsuarios();
        }
      });
    }
  }



  
  
  
  

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
  chat() {
    this.router.navigateByUrl('/chat');
  }
}
