import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-zaduzenja',
  templateUrl: './zaduzenja.component.html',
  styleUrls: ['./zaduzenja.component.css']
})
export class ZaduzenjaComponent implements OnInit {

  constructor(private servis:BookService, private userservis: UserService, private router:  Router) { }

  books: Book[]=[];
  user: User;

  type:string;


  ngOnInit(): void {
 
    this.type=localStorage.getItem("type");
    this.userservis.getUser(localStorage.getItem("username")).subscribe((user: User) => {
      this.user = user;
      this.servis.loaned(this.user.username, "" ).subscribe((data:Book[])=>{
        this.books=data;

        this.retDate();
    
      })
    })

    
  }

  retDate(){
    let d = new Date();
    var currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    
    this.books.forEach((book)=>{
      book.person.forEach((p)=>{
        var deadline=new Date(p.deadline);
        if(p.returned=="" && p.username==this.user.username)
        p.days= Math.floor((Date.UTC(deadline.getFullYear(), deadline.getMonth(), deadline.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())  ) /(1000 * 60 * 60 * 24));      
        
      })
    })
  }


  details(b) {
      localStorage.setItem("book", b);
      this.router.navigate(["bookdetails"]);
    
  }

  returnBook(b) {
    var pipe = new DatePipe('en-US');
    var now = Date.now();
    var time = pipe.transform(now, 'yyyy-MM-dd');
    this.servis.update(b,this.user.username,time).subscribe((b: String) => {
      console.log(b);
    });  

    window.location.reload();
    
  
}

}
