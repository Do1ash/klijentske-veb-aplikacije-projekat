import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // tabela
  displayedColumns: string[] = ['title', 'originalTitle', 'runTime', 'director', 'actions'];
  movies: any[] = [];

  // filteri
  searchText: string = '';
  selectedActor: number | null = null;
  selectedGenre: number | null = null;
  selectedDirector: number | null = null;

  // dropdown podaci
  actors: any[] = [];
  genres: any[] = [];
  directors: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // učitaj sve filtere i filmove
    MovieService.getActors().then(r => this.actors = r.data);
    MovieService.getGenres().then(r => this.genres = r.data);
    MovieService.getDirectors().then(r => this.directors = r.data);
    this.doSearch();
  }

  doSearch() {
    MovieService.searchMovies({
      search: this.searchText,
      actor: this.selectedActor ?? undefined,
      genre: this.selectedGenre ?? undefined,
      director: this.selectedDirector ?? undefined,
    })
      .then(r => this.movies = r.data)
      .catch(e => console.error(e));
  }

  doReset() {
    this.searchText = '';
    this.selectedActor = null;
    this.selectedGenre = null;
    this.selectedDirector = null;
    this.doSearch();
  }
  reserve(id: number) {
  alert(`Rezervacija za film #${id} nije još implementirana.`);
}
}
