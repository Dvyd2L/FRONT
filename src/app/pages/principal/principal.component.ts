// principal.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { StorageHelper } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  navigateTo(sectionId: string): void {
    window.location.href = sectionId;
  }

  usuarios: IUser[] = [];

  // userData: IUser = {
  //   email:"",
  //   password:"",
  //   nombre:"",
  //   rol:"",
  // };

  // salaSeleccionada: string = ''; 

  constructor(private usuariosService: UsuariosService, private loginService: LoginService, private router: Router) 
  {
    // this.userData = StorageHelper.getItem<IUser>('usuario')!;
    // this.salaSeleccionada = this.userData.rol!;
  }


  // ngOnInit(): void {
  //   this.getUsuarios();
  // }

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




  
  registrar() {
    this.router.navigateByUrl('registro');
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  registrar2(): void {
    this.router.navigate(['/registro']);
  }
}