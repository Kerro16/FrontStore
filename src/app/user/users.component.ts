import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class ManageusersComponent {

  users: any[] =[];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private userService: UserserviceService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:' , error);
      }
    );
  }

}
