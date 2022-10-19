import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  clicked: boolean;

  constructor(private servis: UserService, private router: Router, private bservis: BookService,private http: HttpClient) { }
  isLoaned: boolean;
  denied: boolean;
  mybook: Book;
  books: Book[] = [];
  picture: string;
  message: string;
  canLoan: boolean;
  sum: number;

  type: string;
  isAdmin:boolean;


  ngOnInit(): void {
    this.isAdmin=false;
    this.clicked = false;
    this.message = "";
    this.type = localStorage.getItem("type");
    if(this.type=="admin")this.isAdmin=true;
    this.sum = 0;
    this.canLoan = false;
    this.isLoaned = false;
    this.denied = false;
    this.picture = localStorage.getItem("slika");
    this.bservis.getSingle(localStorage.getItem("book")).subscribe((books: Book[]) => {
      this.mybook = books[0];

      this.mybook.comments.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      })

      this.title = this.mybook.title;
      this.author = this.mybook.author;
      this.publisher = this.mybook.publisher;
      this.genre = this.mybook.genre;
      this.lang = this.mybook.lang;
      this.cover = this.mybook.cover;
      this.num = this.mybook.num;
      this.year=this.mybook.year;

    })

    this.bservis.loaned(localStorage.getItem("username"), "").subscribe((data: Book[]) => {
      this.books = data;
      this.getStats();

    })

  }

  getStats() {
    let d = new Date();
    var currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var maxbooks = 0;
    this.books.forEach((b) => {
      b.person.forEach((p) => {
        if (p.username == localStorage.getItem("username") && p.returned == "") {
          maxbooks++;
          if (b.title == this.mybook.title) this.isLoaned = true;
          var deadline = new Date(p.deadline);
          p.days = Math.floor((Date.UTC(deadline.getFullYear(), deadline.getMonth(), deadline.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
          if (p.days < 0) this.denied = true;
        }
      })
    })

    if (this.mybook.num > 0 && !this.denied && !this.isLoaned && maxbooks < 4) {
      this.canLoan = true;
    } else if (this.mybook.num <= 0) {
      this.message = "Knjiga nije na stanju."
    } else {
      this.message = "Ne ispunjavate kriterijume za zaduzivanje knjige."
    }


    //let sum=0;
    if (this.mybook.comments.length) {
      this.mybook.comments.forEach(com => {
        this.sum = Number(this.sum) + Number(com.ocena);
      });
      this.mybook.score = this.sum / this.mybook.comments.length;
    } else { this.mybook.score = 0; }

  }



  takeBook() {
    let title = this.mybook.title;
    let username = localStorage.getItem("username");
    let d = new Date();
    var currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    //dohvati rok
    let days=0;
    this.servis.getRok().subscribe((b:User)=>{
      days=b.accepted;
      currentDate.setDate(currentDate.getDate() + days);
    this.bservis.take(title, username, currentDate).subscribe((b: String) => {
      console.log(b);
    });
    })

    window.location.reload();
  }

  azuriraj() {
    if(this.title && this.author && this.genre && this.publisher && this.year && this.lang && this.num){
    this.bservis.azuriraj(this.mybook.title, this.title, this.author, this.genre, this.publisher, this.year, this.lang, this.cover, this.num).subscribe((b: String) => {
      console.log(b);
    });
    
  }
    else this.message="Ne smete ostaviti prazna polja."

    window.location.reload();

  }

  kliknuto() {
    this.clicked = !this.clicked;
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;
            this.cover= file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
        }
}


  title: string;
  author: string;
  publisher: string;
  year: number;
  genre: string;
  lang: string;
  cover: string;
  num: number;

  fileName='';



}
