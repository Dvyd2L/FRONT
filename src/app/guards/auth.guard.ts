import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageHelper } from '../helpers/storage.helper';
import { IUsuarioChat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private router = inject(Router);

  /**
   * Los guards son servicios de Angular que nos permiten vigilar 
   * si el usuario tiene derecho a entrar a ciertos sitios. 
   * Debemos implementar una función que contraste si el usuario 
   * cumple ciertos requisitos En este caso, si en el localStorage 
   * hay un objeto usuario, señal de que se ha autenticado Esto sería 
   * mejorable, porque podríamos mirar dentro del token el rol del 
   * usuario (si el backend lo tenemos programado para devolver esa 
   * información). O si en el token hay cierto valor dejarle o no pasar... 
   * MUY IMPORTANTE. Este guard no sirve de nada si no se integra en el routing
   * @returns 
   */
  isLoggedIn() {
    const user = localStorage.getItem('usuario');
    if (user) {// Si el usuario está loggeado, devolvemos true.
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  /**
   * PARA QUE NO DEJE ENTRAR A COMPONENTES SI NO ERES ADMIN, SE AÑADE AL ROUTING
   * @param {ActivatedRouteSnapshot} route Ruta asociada a un componente
   * @param {RouterStateSnapshot} state no se su utilidad todavia
   * @returns 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    // const userData = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userData = StorageHelper.getItem<IUsuarioChat>('usuario');

    if (userData && userData.role === expectedRole) {
      return true;
    }
    
    this.router.navigate(['chat']);
    return false;
  }
}

export const authGuard = () => {
  const router = inject(Router);
  const user = StorageHelper.getItem('usuario');
  
  // Si el usuario está loggeado, devolvemos true.
  if (user) {
    return true;
  }
  router.navigate(['login']);
  return false;
}