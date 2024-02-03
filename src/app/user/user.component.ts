import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class ManageusersComponent implements OnInit{

  users: any[] = [];
  maxSize: number = 7;
  totalItems: number = 0; 
  p: number = 1;
  itemsPerPage: number = 12;

  constructor(private userService: UserserviceService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.totalItems = this.users.length;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  pageChanged(event: number): void {
    this.p = event;
    console.log(this.p);
  }
}
