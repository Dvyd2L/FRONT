import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageHelper } from '../helpers/storage.helper';
import { StorageKeyEnum } from '../interfaces/enums/chat';

@Injectable({
  providedIn: 'root',
})
export class UserService<T> {
  private currentUserSubject = new BehaviorSubject<T>(null!);
  public user$ = this.currentUserSubject.asObservable();

  public updateUser(user: T) {
    StorageHelper.setItem(StorageKeyEnum.User,user);
    this.currentUserSubject.next(user);
  }

  public clearUser() {
    StorageHelper.removeItem(StorageKeyEnum.User);
    this.currentUserSubject.next(null!);
  }
}
