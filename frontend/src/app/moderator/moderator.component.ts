import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  user: User;
  username:string;
  book: Book;
  date: Date;

  constructor(private servis: UserService, private bservis: BookService) {
    let d = new Date();
    this.date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
   }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.servis.getUser(this.username).subscribe((user: User) => {
      this.user = user;
      localStorage.setItem("slika", user.picture);
    })

    let d = new Date();
    var g1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (this.bservis.getBookDay() && g1.getTime() == this.date.getTime()) {
      this.book=this.bservis.getBookDay();

    } else {
      this.bservis.randBook().subscribe((b: Book) => {
        this.book = b;
        this.bservis.setBookDay(b, this.date);
      })

    }
  }


}
