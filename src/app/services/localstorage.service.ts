import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class StorageHelper {

    public static setItem(key: string, value: any, useSessionStorage: boolean = false): void {
      const storage = useSessionStorage ? sessionStorage : localStorage;
  
      storage.setItem(key, JSON.stringify(value));
    }
  
    public static getItem<T>(key: string, useSessionStorage: boolean = false): T | null {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      const item = storage.getItem(key);
  
      return item ? JSON.parse(item) : null;
    }
  
    public static removeItem(key: string, useSessionStorage: boolean = false): void {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      storage.removeItem(key);
    }
  
    public static clear(useSessionStorage: boolean = false): void {
      const storage = useSessionStorage ? sessionStorage : localStorage;
  
      storage.clear();
    }
  }