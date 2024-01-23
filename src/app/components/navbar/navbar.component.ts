import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from '../../services/auth.service';
import { StorageHelper } from 'src/app/helpers/storage.helper';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [NgIf, RouterLink],
  providers: [LoginService],
})
export class NavbarComponent implements OnInit {
  userEmail: string | null = null;
  userRol: string | null = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // Suscríbete a cambios en el evento de inicio de sesión exitoso
    this.loginService.onLoginSuccess.subscribe(() => {
      // Actualiza el email en la barra de navegación después de iniciar sesión
      this.userEmail = this.loginService.getUserEmail();
      this.userRol = this.loginService.getUserRole();
    });
  }

  logout(): void {
    this.loginService.logout();
    this.userEmail = null;
    this.userRol = null;
    StorageHelper.removeItem('usuario');
  }
}
