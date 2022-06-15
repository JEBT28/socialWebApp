import {IPost} from "./Post";

export interface IUser {
    usuario: string;
    foto: string;
    Posts: IPost[];
    nombre: string;
    apellido: string;

}