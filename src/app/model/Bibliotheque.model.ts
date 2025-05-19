import { Game } from './game.model';

export class Bibliotheque {
  id!: number;
  nom!: string;
  proprietaire!: string;
  games!: Game[];
}
