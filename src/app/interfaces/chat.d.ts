export interface IUsuarioChat {
  id: Guid;
  email: Email;
  nombre: string;
  rol: RolesEnum;
  avatar: string | null;
}

export interface IMensajeChat {
    id: Guid;
    user: IUsuarioChat;
    text: string;
    room: string;
    fecha: Date;
}

export declare enum RolesEnum {
  Admin,
  Grupo1,
  Grupo2,
  Grupo3,
  Grupo4,
  Grupo5,
  Grupo6,
}

type Guid = `${string}-${string}-${string}-${string}-${string}`;
type Email = `${string}@${string}.${string}`;
