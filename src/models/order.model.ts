import { MovieModel } from './movie.model';

export interface OrderModel {
  id: number;
  movieId: number;
  movie: MovieModel;
  count: number;
  pricePerItem: number;
  status: 'ordered' | 'reserved' | 'paid' | 'canceled';
  rating: boolean | null;
}
