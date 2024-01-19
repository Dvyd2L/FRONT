

export interface IMessage {
user: string;
text: string;
avatar: string;
room : string ;
file : File | null;
timestamp?: Date;
id?: number
}