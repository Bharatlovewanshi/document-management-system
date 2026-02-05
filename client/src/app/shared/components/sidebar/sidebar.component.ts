import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  user = this.authService.getCurrentUser();

  constructor(private authService: AuthService) {}

  isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }
}
