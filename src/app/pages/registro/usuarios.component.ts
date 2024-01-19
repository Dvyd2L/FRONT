import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login.service';
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
    rol: ''
  };

  usuarios: IUser[] = [];

  constructor(private usuariosService: UsuariosService, private loginService: LoginService, private router: Router) {}


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
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

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
  chat() {
    this.router.navigateByUrl('/chat');
  }
}
