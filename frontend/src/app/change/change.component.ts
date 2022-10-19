import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  username: string;
  password: string;
  newpass: string;
  message: string;

  new2: string;
  isUser: boolean;
  type: string;
  user: User;
  strong: boolean;


  constructor(private servis: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.strong=true;
    if (localStorage.getItem("username")) { //this.servis.getName() != ""
      this.isUser = true;
      this.servis.getUser(localStorage.getItem("username")).subscribe((user: User) => {
        this.user = user;
        this.username=user.username;
        // this.type=this.servis.getType();
       this.type = user.type;
      })
    }

    else {
      this.isUser = false;
    }
    


  }

  changePass() {
    this.isStrong();

    if (this.newpass == this.new2 && this.strong && this.newpass &&this.password && this.username) {
      this.servis.change(this.username, this.password, this.newpass).subscribe(resp => {
        alert(resp['message'])
      })

      this.router.navigate(['']);
    } else {
      if (this.newpass != this.new2)
      this.message = "Polja za novu lozinku se ne  poklapaju!"
      else this.message = "Morate popuniti sva polja!"
    }

  }

  isStrong(){
    let hasNumber = /\d/.test(this.newpass);
    let hasUpper = /[A-Z]/.test(this.newpass);
    let hasLower = /[a-z]/.test(this.newpass);
    let hasSpec = /[$@$!%*?&]/.test(this.newpass);
    if(hasNumber && hasUpper && hasLower && hasSpec && this.newpass.length>7 && this.newpass.length<13)this.strong=true;
    else this.strong=false;

}


}
