import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { MovieModel } from '../../models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  public movie: MovieModel | null = null;
  public count: number = 1;
  public pricePerItem: number = 600;

   constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      MovieService.getMovieById(id).then(rsp => {
        this.movie = rsp.data;
      });
    });
  }

  async doOrder() {
    if (!this.movie) return;

    const user = UserService.getCurrentUser();
    if (!user) {
      Swal.fire({
        title: 'Morate biti prijavljeni!',
        icon: 'warning',
        confirmButtonText: 'U redu'
      });
      this.router.navigate(['/login']);
      return;
    }

    const order = {
      id: new Date().getTime(),
      movieId: this.movie.movieId,
      movie: this.movie!,
      count: this.count,
      pricePerItem: this.pricePerItem,
      status: 'reserved' as const,
      rating: null
    };

    const result = UserService.addOrderToUser(user.id, order);
    if (result) {
      Swal.fire({
        title: 'Rezervacija uspešna!',
        icon: 'success',
        confirmButtonText: 'Profil'
      }).then(() => this.router.navigate(['/user']));
    } else {
      Swal.fire({
        title: 'Došlo je do greške',
        icon: 'error'
      });
    }
  }
}