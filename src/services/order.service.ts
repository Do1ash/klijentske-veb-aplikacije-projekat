import { OrderModel } from '../models/order.model';

export class OrderService {
  private static STORAGE_KEY = 'kva_orders';

  private static loadOrders(): OrderModel[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private static saveOrders(orders: OrderModel[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
  }

  static getOrders(): OrderModel[] {
    return this.loadOrders();
  }

  static addOrder(order: OrderModel) {
    const orders = this.loadOrders();
    order.id = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
    orders.push(order);
    this.saveOrders(orders);
  }

  static getOrdersForUser(userId: number): OrderModel[] {
    return this.loadOrders().filter(o => o.userId === userId);
  }
}
