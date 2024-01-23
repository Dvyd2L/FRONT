import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from '../helpers/storage.helper';
import { StorageKeyEnum } from '../interfaces/enums/chat';

export const authGuard = () => {
  const router = inject(Router);
  const user = StorageHelper.getItem(StorageKeyEnum.User);
  
  // Si el usuario está loggeado, devolvemos true.
  if (user) {
    return true;
  }
  router.navigate(['login']);
  return false;
}