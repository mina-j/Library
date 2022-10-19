import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isStringTextContainingNode } from 'typescript';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input()
  requiredFileType:string;

  fileName = '';


  firstname: string;
  lastname: string;
  username: string;
  password: string;
  address: string;
  tel: string;
  picture: string;
  email: string;
  type: string;
  accepted: number;
  patt: string;
  strong: boolean;

  isUser:boolean;
  cover:string;


  message:string;

  constructor(private servis: UserService, private router: Router, private http: HttpClient) {
    this.picture='';
    this.message='';
    this.strong=true;
   }

  ngOnInit(): void {
    this.isUser=false;
    if(localStorage.getItem("username")){
      this.isUser=true;
    this.cover=localStorage.getItem("slika")
  }
  }


  register(){
    this.isStrong();

    if(this.picture==''){
      this.picture="default.png"
    }
    this.type="citalac";
    this.accepted=0;
    if(this.firstname && this.lastname && this.username &&
      this.password && this.address && this.tel && this.email && this.strong)
    this.servis.register(this.firstname, this.lastname, this.username,
       this.password, this.address, this.tel, this.email,this.picture,this.type,this.accepted).subscribe((resp)=>{
        if(resp['message']=='user added'){
          alert("OK")
          this.router.navigate(['']);
        }else{
          alert("ERROR")
        }
    })
    else this.message="Morate popuniti sva polja!!!";
  }

  isStrong(){
        let hasNumber = /\d/.test(this.password);
        let hasUpper = /[A-Z]/.test(this.password);
        let hasLower = /[a-z]/.test(this.password);
        let hasSpec = /[$@$!%*?&]/.test(this.password);
        if(hasNumber && hasUpper && hasLower && hasSpec && this.password.length>7 && this.password.length<13)this.strong=true;
        else this.strong=false;

  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;
            this.picture= file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
        }
}



}
