import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user:User;
  username:string;
  type: string;

  constructor(private servis: UserService) { }

  ngOnInit(): void {
    this.type=localStorage.getItem("type");
    this.username=localStorage.getItem("username");
    this.servis.getUser(this.username).subscribe((user: User)=>{
       this.user=user;
  })



  }

}
