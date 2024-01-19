import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { LoginComponent } from '../pages/login/login.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ChatComponent } from '../pages/PruebaChat/chat.component';
import { UsuariosComponent } from '../pages/registro/usuarios.component';
import { PrincipalComponent } from '../pages/principal/principal.component';
import { HistorialComponent } from '../pages/historial/historial.component';

// Esta línea conecta el sistema de rutas con el guard (algo así como el vigilante).
// isLoggedin será un método del AuthGuardService que se encargará de validar si el usuario está loggeado.
export const canActivate = (authGuard: AuthGuardService = inject(AuthGuardService)) => authGuard.isLoggedIn();

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [() => canActivate()] // Aquí se le pasa el método que valida si el usuario está loggeado.
    // canActivate "abrritá la puerta" dependiendo de lo que el canActivate del AuthGuardService devuelva.
  },
  // {
  //     path: 'registro',
  //     component: UsuariosComponent,
  //     canActivate: [() => canActivate()] // Aquí se le pasa el método que valida si el usuario está loggeado.
  //     // canActivate "abrritá la puerta" dependiendo de lo que el canActivate del AuthGuardService devuelva.
  //   },
    {
    path: 'registro',
    component: UsuariosComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRole: 'admin' // Puedes configurar el rol esperado en la propiedad data
    }
  },
   
  // {path: 'chat', component: ChatComponent},
  { path: 'inicio', component: PrincipalComponent},

  { path: 'historial', component: HistorialComponent},
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}