import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;
  searchName:string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        localStorage.setItem("username",user.username);
        localStorage.setItem("type",user.type);
        this.userService.setType(user.type);
        if(user.type == 'citalac'){
          this.userService.setType(user.type);
          this.router.navigate(['/citalac']);
        }
        else if(user.type == 'admin'){
          this.router.navigate(['/admin']);
        }else {this.router.navigate(['/moderator']);}
      }
      else this.message = "Bad data";
    })

  }



}
