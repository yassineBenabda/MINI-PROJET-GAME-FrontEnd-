import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-genres.component.html'
})
export class UpdateGenresComponent implements OnInit {
  @Input() genre!: Genre;
  @Input() ajout!: boolean;
  @Output() genreUpdated = new EventEmitter<Genre>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.genre);
  }

  saveGenre() {
    this.genreUpdated.emit(this.genre);
  }
}
