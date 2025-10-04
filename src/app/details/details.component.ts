import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,NgIf, NgFor, MatCardModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  movie: any | null = null;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
        .then(rsp => this.movie = rsp.data)
        .catch(err => console.error(err));
    });
  }

  reserve() {
    alert(`Rezervacija za film "${this.movie?.title}" nije još implementirana.`);
  }
}

