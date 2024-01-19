import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { StorageHelper } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: IUser = {
    email: '',
    password: ''
  };


  constructor(private loginService: LoginService, private router: Router, private authGuardServide: AuthGuardService) 
  {
  }

  ngOnInit() {}

  login() {
    this.loginService.login(this.usuario).subscribe({
      next: (data) => {
        localStorage.setItem('usuario', JSON.stringify(data));
        this.router.navigateByUrl('chat');

      },
      error: (err) => {
        alert('Credenciales erróneas');
      },
      complete: () => {}
    });
  }

}