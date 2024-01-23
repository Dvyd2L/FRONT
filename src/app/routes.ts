import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './guards';

// isLoggedin será un método del AuthGuardService que se encargará de validar si el usuario está loggeado.
// export const canActivate = (authGuard: AuthGuard = inject(AuthGuard)) =>
//   authGuard.isLoggedIn();

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    title: 'Inicio',
    loadComponent: () =>
      import('./pages/principal/principal.component').then(
        (c) => c.PrincipalComponent
      ),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'registro',
    title: 'Registro',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/registro/usuarios.component').then(
        (c) => c.UsuariosComponent
      ),
    // data: {
    //   expectedRole: RolesEnum.Admin // Puedes configurar el rol esperado en la propiedad data
    // }
  },
  {
    path: 'chat',
    title: 'Chat',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/chat/chat.component').then((c) => c.ChatComponent),
    // canActivate "abrritá la puerta" dependiendo de lo que el canActivate del AuthGuardService devuelva.
    // Aquí se le pasa el método que valida si el usuario está loggeado.
    // canActivate: [() => canActivate()]
  },
  {
    path: 'historial',
    title: 'Historial',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/historial/historial.component').then(
        (c) => c.HistorialComponent
      ),
  },
  {
    path: '**',
    title: '404 Not Found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
