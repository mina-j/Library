import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import {Comment} from '../models/comment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchName:string;
  books: Book[]=[];

  constructor(private bservis: BookService, private servis: UserService) { }

  ngOnInit(): void {
    this.servis.setType("");
    localStorage.removeItem("username");
    localStorage.removeItem("slika");
    this.bservis.getBooks().subscribe((data:Book[])=>{
      this.books=data;
      this.books.sort((a,b)=>{
        return b.num-a.num;
      })
      this.avg();
  
    })
  }

  avg(){
    
    this.books.forEach((b)=>{
      var sum=0;
      if(b.comments.length){
      b.comments.forEach(com => {
        sum= Number(sum) + Number(com.ocena);
      });
      b.score=sum/b.comments.length;
    }else {b.score=0;}
    })
  }

}
