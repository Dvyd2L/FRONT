export enum RolesEnum {
  Admin,
  User,
}

export enum RoomsEnum {
  Conjunta,
  Sala1,
  Sala2,
  Sala3,
  Sala4,
  Sala5,
  Sala6,
}

export enum ChatEventEnum {
  GetMessage = 'GetMessage',
  SendMessage = 'SendMessage',
  ConnectUser = 'ConnectUser',
}

export enum StorageKeyEnum {
  User = 'usuario',
  Token = 'token',
  Room = 'sala',
  Role = 'rol',
  Message = 'mensaje',
  ConnectdUsers = 'connectdUsers',
  MessageList = 'listaMensajes',
}

export enum ApiEndpointEnum {
  Users = 'Usuarios',
  Messages = 'Mensajes',
  /* ... */
}
