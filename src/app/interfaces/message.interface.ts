

export interface IMessage {
user: string;
text: string;
avatar: string;
room : string ;
// rol?: string;
file : File | null;
timestamp?: Date;
//idUsuario?:number
id?: number
}