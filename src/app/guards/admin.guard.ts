import { inject } from '@angular/core';
import { StorageHelper } from '../helpers/storage.helper';
import { IUsuarioChat } from '../interfaces/chat';
import { RolesEnum, StorageKeyEnum } from '../interfaces/enums/chat';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const router = inject(Router);
  const user = StorageHelper.getItem<IUsuarioChat>(StorageKeyEnum.User);

  if (user?.role === RolesEnum.Admin) {
    return true;
  }
  router.navigate(['chat']);
  return false;
};
