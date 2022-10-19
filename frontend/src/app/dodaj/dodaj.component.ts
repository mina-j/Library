import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-dodaj',
  templateUrl: './dodaj.component.html',
  styleUrls: ['./dodaj.component.css']
})
export class DodajComponent implements OnInit {

  title:string;
  author: string;
  publisher: string;
  year: number;
  genre: string;
  lang: string;
  cover:string;
  num: number;

  message: string;
  picture: string;
  fileName='';

  isAdmin: boolean;


  constructor(private servis: BookService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.isAdmin=false;
    if(localStorage.getItem("type")=="admin")this.isAdmin=true;
    this.cover="cover.jpg";
    this.picture=localStorage.getItem("slika");
  }

  add() {
    if(this.title && this.author && this.genre && this.publisher && this.year && this.lang && this.num)
    this.servis.add(this.title, this.author,this.genre,this.publisher,Number(this.year),this.lang,this.cover,Number(this.num)).subscribe((b: String) => {
      console.log(b);
    }); 
    else {this.message="Morate popuniti sva polja!!!";
      return;
  }

    this.router.navigate(['/moderator'])
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

}
