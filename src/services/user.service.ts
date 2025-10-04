import { UserModel } from '../models/user.model';
import { OrderModel } from '../models/order.model';

type NewUser = Omit<UserModel, 'id' | 'orders'> & { orders?: OrderModel[] };

export class UserService {
  private static STORAGE_KEY = 'kva_users';
  private static CURRENT_USER_KEY = 'kva_current_user';

  private static loadUsers(): UserModel[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) as UserModel[] : [];
  }

  private static saveUsers(users: UserModel[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private static nextId(): number {
    const users = this.loadUsers();
    if (users.length === 0) return 1;
    return Math.max(...users.map(u => u.id)) + 1;
  }

  static createUser(newUser: NewUser): boolean {
    const users = this.loadUsers();

    if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      return false;
    }

    const id = this.nextId();
    const user: UserModel = {
      id,
      email: newUser.email,
      password: newUser.password,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone ?? '',
      address: newUser.address ?? '',
      orders: newUser.orders ?? [],
    };

    users.push(user);
    this.saveUsers(users);
    return true;
  }

  static login(email: string, password: string): boolean {
    const users = this.loadUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return false;

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(found));
    return true;
  }

  static logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  static getCurrentUser(): UserModel | null {
    const raw = localStorage.getItem(this.CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) as UserModel : null;
  }

  static addOrderToUser(userId: number, order: OrderModel): boolean {
    const users = this.loadUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx].orders.push(order);
    this.saveUsers(users);

    if (this.getCurrentUser()?.id === userId) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[idx]));
    }

    return true;
  }

  static changePassword(newPassword: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    const users = this.loadUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return false;

    users[idx].password = newPassword;
    this.saveUsers(users);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[idx]));
    return true;
  }

  static updateUser(updatedUser: UserModel): boolean {
    const users = this.loadUsers();
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx === -1) return false;

    users[idx] = updatedUser;
    this.saveUsers(users);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
    return true;
  }

  static changeOrderStatus(
    status: 'ordered' | 'reserved' | 'paid' | 'canceled',
    orderId: number
  ): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    const users = this.loadUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return false;

    const order = users[idx].orders.find(o => o.id === orderId);
    if (!order) return false;

    order.status = status;
    this.saveUsers(users);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[idx]));
    return true;
  }


  static changeRating(rating: boolean, orderId: number): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    const users = this.loadUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return false;

    const order = users[idx].orders.find(o => o.id === orderId);
    if (!order) return false;

    order.rating = rating;
    this.saveUsers(users);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[idx]));
    return true;
  }
}
