import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public email = '';
  public password = '';
  public repeatPassword = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';

  constructor(private router: Router) {}

  public doSignup() {
    if (this.email === '' || this.password === '') {
      alert('Email i lozinka su obavezna polja.');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Lozinke se ne poklapaju.');
      return;
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      orders: []
    });

    if (result) {
      alert('Registracija uspešna!');
      this.router.navigate(['/login']);
    } else {
      alert('Ovaj email je već registrovan.');
    }
  }
}
