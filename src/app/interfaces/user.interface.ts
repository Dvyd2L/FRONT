export interface IUser {
  id?: number;
  nombre?: string;
    email: string;
    password: string;
    rol?: string;
    token?: string;

  }
  
  export interface ITokenInfo {
    email: string;
    token: string;
  }