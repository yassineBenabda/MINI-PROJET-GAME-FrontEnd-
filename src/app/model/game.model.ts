import { Developer } from "./developer.model";
import { Genre } from "./genre.model";
import { Platform } from "./platform.model";

export class Game {
    idGame! : number;
    nomGame! : string;
    prixGame! : number;
    datedeSortie! : Date ;
    genre! : Genre;
    email! : string;
    enable! : boolean;
    developer?: Developer;
    platforms?: Platform[];
}