import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/auth.service';
// import { AuthGuard } from 'src/app/guards/auth.guard';
import { IUser } from 'src/app/interfaces/user.interface';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
  providers: [LoginService],
})
export class LoginComponent /* implements OnInit */ {
  private loginService = inject(LoginService);
  private router = inject(Router);
  // private authGuard= inject(AuthGuard);

  usuario: IUser = {
    email: '',
    password: ''
  };

  // ngOnInit() {}

  login() {
    this.loginService.login(this.usuario).subscribe({
      next: (data) => {
        StorageHelper.setItem('usuario', data);
        this.router.navigateByUrl('chat');
      },
      error: (err) => {
        console.error(err);
        alert('Credenciales erróneas');
      },
      complete: () => { }
    });
  }

}