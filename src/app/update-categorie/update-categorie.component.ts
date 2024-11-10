import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: ``
})
export class UpdateCategorieComponent implements OnInit{

  @Input()
  genre! : Genre;

  @Output()
  genreUpdated = new EventEmitter<Genre>();

  @Input()
  ajout!:boolean;
  
  constructor() {}
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGenre ",this.genre);
  }
  saveGenre() {
    this.genreUpdated.emit(this.genre);
  }
}