import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.css'
})
export class ManageusersComponent {

  users: any[] =[];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:' , error);
      }
    );
  }

}
