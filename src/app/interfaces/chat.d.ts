import { RolesEnum, RoomsEnum } from "./enums/chat";

export declare interface IUsuarioChat {
  id: Guid;
  email: Email;
  name: string;
  role: RolesEnum;
  avatar: string | null;
}

export declare interface IMensajeChat {
  id?: Guid;
  user: IUsuarioChat;
  text: string;
  room: RoomsEnum;
  timestamp: Date | number; // UNIX
  file: File | null;
}

declare type Guid = `${string}-${string}-${string}-${string}-${string}`;
declare type Email = `${string}@${string}.${string}`;
