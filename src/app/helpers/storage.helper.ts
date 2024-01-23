

export class StorageHelper {

    public static setItem<T>(key: string, value: T, useSessionStorage: boolean = false): void {
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


    public static setAvatar(avatar: string, useSessionStorage: boolean = false): void {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      storage.setItem('avatar', avatar);
    }
  
    public static getAvatar(useSessionStorage: boolean = false): string {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      const storedAvatar = storage.getItem('avatar');
      return storedAvatar ? storedAvatar : 'https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png';
    }

    public static removeAvatar(useSessionStorage: boolean = false): void {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      storage.removeItem('avatar');
    }

    public static guardarMensaje(mensaje: { usuario: string, mensaje: string }[], useSessionStorage: boolean = false): void {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      const mensajesGuardados = this.getItem<{ usuario: string, mensaje: string, timestamp: number }[]>('chatMessages', useSessionStorage) || [];
      
      // Agregar timestamp a cada mensaje
      const mensajesConTimestamp = mensaje.map(m => ({ ...m, timestamp: Date.now() }));
      mensajesGuardados.push(...mensajesConTimestamp);
  
      // Filtrar mensajes que están dentro del límite de tiempo (10 minutos)
      const limiteTiempo = 1 * 60 * 1000; // 10 minutos en milisegundos
      const mensajesFiltrados = mensajesGuardados.filter(m => Date.now() - m.timestamp <= limiteTiempo);
  
      storage.setItem('chatMessages', JSON.stringify(mensajesFiltrados));
    }
  
    public static obtenerMensajes(useSessionStorage: boolean = false): { usuario: string, mensaje: string }[] {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      const mensajesGuardados = this.getItem<{ usuario: string, mensaje: string, timestamp: number }[]>('chatMessages', useSessionStorage) || [];
  
      // Filtrar mensajes que están dentro del límite de tiempo (10 minutos)
      const limiteTiempo = 1 * 60 * 1000; // 10 minutos en milisegundos
      const mensajesFiltrados = mensajesGuardados.filter(m => Date.now() - m.timestamp <= limiteTiempo);
  
      // Obtener solo el contenido del mensaje y el usuario
      const mensajes = mensajesFiltrados.map(m => ({ usuario: m.usuario, mensaje: m.mensaje }));
  
      return mensajes;
    }
  }