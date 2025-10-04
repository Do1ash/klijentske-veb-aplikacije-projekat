import { MovieModel } from "./movie.model"

export interface OrderModel {
  id: number
  movieId: number
  userId: number;
  date: string;
  movie: MovieModel
  projectionDate: string
  ticketCount: number
  ticketPrice: number
  totalPrice: number
  status: 'ordered' | 'reserved' | 'paid' | 'canceled';
  rating: boolean | null;
}
