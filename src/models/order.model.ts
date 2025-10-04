import { MovieModel } from "./movie.model"

export interface OrderModel {
  id: number
  userId: number
  movieId: number
  movie: MovieModel
  projectionDate: string
  ticketCount: number
  ticketPrice: number
  totalPrice: number
  status: 'ordered' | 'reserved' | 'paid' | 'canceled';
  rating: boolean | null;
}
