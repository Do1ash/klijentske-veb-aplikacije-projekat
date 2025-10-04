import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';

  constructor(private router: Router) {}

  public updateEmail(e: any) {
    this.email = e.target.value;
  }

  public updatePassword(e: any) {
    this.password = e.target.value;
  }

  public doLogin() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Unesite email i lozinku');
      return;
    }

    const success = UserService.login(this.email, this.password);

    if (success) {
      alert('Uspešno ste se prijavili!');
      this.router.navigate(['/home']);
    } else {
      alert('Pogrešan email ili lozinka');
    }
  }
}
