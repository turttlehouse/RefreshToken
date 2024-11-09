import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { json } from 'stream/consumers';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userList : any [] = [];
  constructor(private userService:UserService) { 
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data:any)=>{
      console.log(data);
      this.userList = data.data;
  })
}

}
