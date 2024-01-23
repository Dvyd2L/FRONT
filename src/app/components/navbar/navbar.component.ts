import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUsuarioChat } from 'src/app/interfaces/chat';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [NgIf, RouterLink],
  providers: [AuthService, UserService<IUsuarioChat>],
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService); 
  private userService = inject(UserService<IUsuarioChat>);
  public user!:IUsuarioChat;

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error(err),
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
