import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  people: User[]=[];
  cover: string;
  clicked:boolean;
  fileName: string;
  old:string;
  

  constructor(private servis: UserService, private http: HttpClient, private bservis: BookService) { }

  ngOnInit(): void {
    this.clicked=false;
    this.cover=localStorage.getItem("slika");
    this.servis.allUsers().subscribe((data:User[])=>{
      this.people=data;  
    })

  }

  azuriraj() {
    

      if(this.username && this.address && this.tel && this.email && this.picture && this.type && this.firstname && this.lastname)
    this.servis.update(this.old,this.username , this.address , this.tel , this.email , this.picture , this.type , this.firstname , this.lastname).subscribe((m: String) => {
      console.log(m);
    })    

    window.location.reload();

  }

  kliknuto(ime) {
    this.clicked = !this.clicked;
    if(ime!=""){
    this.servis.getUser(ime).subscribe((user: User) => {
      this.user = user;
      this.old=user.username;
      this.picture=user.picture;
      this.firstname=user.firstname;
      this.lastname=user.lastname;
      this.username=user.username;
      this.address=user.address;
      this.tel=user.tel;
      this.email=user.email;
      this.type=user.type;
    })
  }  
    
  }

  delete(username){
    let can = true;
    let books: Book[] = [];
    this.bservis.loaned(username, "").subscribe((data: Book[]) => {
      books = data;
      if (books.length > 0) {
        this.message = "Korisnik se ne moze obrisati!";
        can = false;
      }

      if (can) {
        this.servis.delete(username).subscribe((b: String) => {
          console.log(b);
        });
  
        window.location.reload();
      }

    })
    console.log(can);
    

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

user: User;
firstname: string;
    lastname: string;
    username: string;
    address: string;
    tel: string;
    email: string;
    picture: string;
    type: string;

    message: string;

}
