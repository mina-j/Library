import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isUser: boolean;
  user: User;
  type: string;
  isAdmin: boolean;

  constructor(private servis: BookService, private userservis: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.isUser = true;
      this.userservis.getUser(localStorage.getItem("username")).subscribe((user: User) => {
        this.user = user;
        this.type=localStorage.getItem("type");

    if(this.type=="admin"){this.isAdmin=true;}else this.isAdmin=false;
      })
    }
    else {
      this.isUser = false;
    }

    

    this.searchParam = '';
    this.autorParam = '';
    this.servis.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.books.sort((a, b) => {
        return b.num - a.num;
      })

    })
  }

  books: Book[] = [];
  searchParam: string;
  autorParam: string;


  search() {
    this.servis.search(this.searchParam, this.autorParam).subscribe((books: Book[]) => {
      this.books = books;
    })

  }

  details(b) {
    if (this.isUser) {
      localStorage.setItem("book", b);
      this.router.navigate(["bookdetails"]);
    }
  }

  delete(b){
    if(b.person.length<=0)
    this.servis.delete(b).subscribe((b: String) => {
      console.log(b);
    });

    window.location.reload();
  }

}
