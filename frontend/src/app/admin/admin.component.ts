import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  people: User[] = [];
  user: User;


  constructor(private servis: UserService, private bservis: BookService) { }

  ngOnInit(): void {
    this.servis.getUser(localStorage.getItem("username")).subscribe((user: User) => {
      this.user = user;
      localStorage.setItem("slika", user.picture);
    })
    this.servis.pending().subscribe((data: User[]) => {
      this.people = data;
    })
  }

  accept(username) {
    this.servis.accept(username).subscribe((b: String) => {
      console.log(b);
    });

    window.location.reload();

  }

  delete(username) {
    let can = true;
    let books: Book[] = [];
    this.bservis.loaned(username, "").subscribe((data: Book[]) => {
      books = data;
      if (books.length > 0) {
        this.message = "Korisnik se ne moze obrisati!";
        can = true;
      }

    })
    console.log(can);
    if (can) {
      this.servis.delete(username).subscribe((b: String) => {
        console.log(b);
      });

      window.location.reload();
    }
    
  }

  rok(){
    this.servis.rok(Number(this.day)).subscribe((b:String)=>{
      console.log(b);
      alert("OK");
    })

  }

  message: string;
  day: Number;



}
