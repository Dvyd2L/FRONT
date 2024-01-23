import { RolesEnum, RoomsEnum } from "./enums/chat";

export declare interface IUsuarioChat {
  id: Guid;
  email: Email;
  name: string;
  role: RolesEnum;
  avatar: string | null;
  room: RoomsEnum;
}

export declare interface IMensajeChat {
  id?: Guid;
  user: IUsuarioChat;
  text: string;
  timestamp: number; // UNIX
  file: File | null;
}

declare type Guid = `${string}-${string}-${string}-${string}-${string}`;
declare type Email = `${string}@${string}.${string}`;
