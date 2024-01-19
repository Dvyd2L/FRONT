export interface IUser {
    id?: number;
    nombre?: string;
    email: string;
    password?: string;
    rol?: string;
    token?: string;
    avatar?: string;
  }
  
  export interface ITokenInfo {
    email: string;
    token: string;
    rol: string
  }