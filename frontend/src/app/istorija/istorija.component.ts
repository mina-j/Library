import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import {Loan} from '../models/loan';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  books: Book[]=[];
  copy: Book[]=[];
  user: User;
  username: string;
  loan: Loan[]=[];
  mysimpleformat: Date;

  type: string;

  constructor(private userservis: UserService, private servis: BookService, private router: Router) { }

  ngOnInit(): void {

    this.type=localStorage.getItem("type");
    this.username=localStorage.getItem("username");
    this.userservis.getUser(this.username).subscribe((user: User) => {
      this.user = user;
      this.servis.loaned(this.username, "n").subscribe((data:Book[])=>{
        this.books=data;
       this.insertLoan(this.books);
        
      })
    })

  }

  insertLoan(books){
     if (books.length==0)console.log(books[0]);
     books.forEach((b)=>{
      b.person.forEach((p)=>{
        if(p.username==this.username && p.returned!=""){
          p.book_name=b.title;
          p.author=b.author;
          this.loan.push(p);
        }
      })
    })

    this.returnedSort();

  }

  details(b){
    localStorage.setItem("book",b);
    this.router.navigate(["bookdetails"]);
  }

  returnedSort(){
    
    this.loan.sort((a,b)=>{
        return Date.parse(b.returned) - Date.parse(a.returned);
      })
    
  }

  autorSort(){
    
      this.loan.sort((a,b)=>{
        return a.author.localeCompare(b.author);
      })
   
  }

  bookSort(){
    this.loan.sort((a,b)=>{
      return a.book_name.localeCompare(b.book_name);
    })
  }

}
