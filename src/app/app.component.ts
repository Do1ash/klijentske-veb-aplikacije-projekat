import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink, RouterOutlet, MatToolbar],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kva';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return UserService.getCurrentUser() !== null;
  }

  logout() {
    UserService.logout();
    this.router.navigate(['/login']);
  }
}
