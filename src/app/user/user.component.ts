import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { UserModel } from '../../models/user.model';
import { OrderModel } from '../../models/order.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'title', 'count', 'price', 'total', 'status', 'actions'];
  user: UserModel | null = null;
  userCopy: UserModel | null = null;

  oldPasswordValue = '';
  newPasswordValue = '';
  repeatPasswordValue = '';

  constructor(private router: Router) {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      alert('Morate biti prijavljeni da biste videli profil.');
      this.router.navigate(['/login']);
      return;
    }

    this.user = UserService.getCurrentUser();
this.userCopy = { ...this.user! }; // znak ! kaže TypeScriptu da nije null
  }

  doChangePassword() {
    if (!this.oldPasswordValue || !this.newPasswordValue) {
      alert('Lozinka ne može biti prazna.');
      return;
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Lozinke se ne poklapaju.');
      return;
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Stara lozinka nije ispravna.');
      return;
    }

    const success = UserService.changePassword(this.newPasswordValue);
    alert(success ? 'Lozinka uspešno promenjena.' : 'Došlo je do greške.');

    this.oldPasswordValue = '';
    this.newPasswordValue = '';
    this.repeatPasswordValue = '';
  }

  doUpdateUser() {
    if (!this.userCopy) {
      alert('Korisnik nije definisan.');
      return;
    }

    UserService.updateUser(this.userCopy);
    this.user = UserService.getCurrentUser();
    alert('Profil uspešno ažuriran.');
  }

  doPay(order: OrderModel) {
    if (UserService.changeOrderStatus('paid', order.id)) {
      this.user = UserService.getCurrentUser();
    }
  }

  doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus('canceled', order.id)) {
      this.user = UserService.getCurrentUser();
    }
  }

  // doRating(order: OrderModel, rating: number) {
  //   if (UserService.changeRating(rating, order.id)) {
  //     this.user = UserService.getCurrentUser();
  //   }
  // }
}
