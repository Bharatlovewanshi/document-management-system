import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  changeRole(userId: string, role: string): void {
    this.userService.updateUserRole(userId, role).subscribe(() => {
      this.loadUsers();
    });
  }

  toggleStatus(userId: string, isActive: boolean): void {
    this.userService.updateUserStatus(userId, !isActive).subscribe(() => {
      this.loadUsers();
    });
  }
}
