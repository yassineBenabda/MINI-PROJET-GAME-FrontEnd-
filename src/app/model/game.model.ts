import { Genre } from "./genre.model";

export class Game {
    idGame! : number;
    nomGame! : string;
    prixGame! : number;
    datedeSortie! : Date ;
    genre! : Genre;
    email! : string;
    enable! : boolean;
}