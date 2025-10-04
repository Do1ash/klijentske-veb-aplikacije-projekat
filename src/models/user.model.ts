import { OrderModel } from './order.model';

export interface UserModel {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  orders: OrderModel[];
}
