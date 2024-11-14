import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genres',
  templateUrl: './update-genres.component.html'
})
export class UpdateGenresComponent implements OnInit {

  @Input()
  genre!: Genre;

  @Output()
  genreUpdated = new EventEmitter<Genre>();

  @Input()
  ajout!: boolean;

  constructor() {}

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.genre);
  }

  saveGenre() {
    this.genreUpdated.emit(this.genre);
  }

}