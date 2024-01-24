import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import {
  ApiEndpointEnum,
  RolesEnum,
  RoomsEnum,
} from 'src/app/interfaces/enums/chat';
import { Email, Guid, IUsuarioChat } from 'src/app/interfaces/chat';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [FormsModule, NgFor],
  providers: [UserService, AuthService, Router],
})
export class UsuariosComponent implements OnInit {
  private userService = inject(UserService);
  private auth = inject(AuthService);
  private api = inject(ApiService);
  private router = inject(Router);

  public usuario: IUsuarioChat = {
    id: '' as Guid,
    email: '' as Email,
    name: '',
    role: RolesEnum.User,
    avatar: null,
    room: RoomsEnum.Conjunta,
  };
  public usuarios: IUsuarioChat[] = [];

  ngOnInit(): void {
    this.getUsuarios();
  }

  public getUsuarios() {
    this.api.get<IUsuarioChat[]>(ApiEndpointEnum.Users).subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error(err),
    });
  }

  public addUsuarios() {
    this.api.create(this.usuario, ApiEndpointEnum.Users).subscribe({
      next: (data) => {
        console.log({ msg: 'Usuario creado correctamente', data });
        alert('Usuario creado correctamente');
        this.usuario.id = '' as Guid;
        this.usuario.email = '' as Email;
        this.usuario.name = '';
        this.usuario.role = RolesEnum.User;
        this.usuario.avatar = null;
        this.usuario.room = RoomsEnum.Conjunta;
      },
      error: (err) => console.error(err),
      complete: () => this.getUsuarios(),
    });
  }

  public updateUsuarios(usuario: IUser, id: number): void {
    const confirmacion = confirm(
      '¿Estás seguro de que deseas actualizar este usuario?'
    );
    if (confirmacion) {
      this.api.update(usuario, id, ApiEndpointEnum.Users).subscribe({
        next: (data) => console.log('Usuario actualizado correctamente', data),
        error: (err) =>
          console.error({ msg: 'Error al actualizar el usuario', err }),
        complete: () => this.getUsuarios(),
      });
    }
  }

  public deleteUsuarios(id: number): void {
    const confirmacion = confirm(
      '¿Estás seguro de que deseas eliminar este usuario?'
    );
    if (confirmacion) {
      this.api.delete(id, ApiEndpointEnum.Users).subscribe({
        next: (data) =>
          console.log({ msg: 'Usuario eliminado correctamente', data }),
        error: (err) =>
          console.error({ msg: 'Error al eliminar el usuario', err }),
        complete: () => {
          this.getUsuarios();
        },
      });
    }
  }

  public logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  public chat() {
    this.router.navigateByUrl('/chat');
  }
}
