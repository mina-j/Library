import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { Comment } from './models/comment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  uri = 'http://localhost:4000';

  //books: Book[]=[];
  bookOfDay: Book;
  date: Date;

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(`${this.uri}/books/getBooks`)
  }

  getSingle(title){
    const data={
      title: title
    }
    return this.http.post(`${this.uri}/books/getSingle`,data)
  }

  randBook(){
    return this.http.get(`${this.uri}/books/randBook`)
  }

  setBookDay(b,d){
    this.bookOfDay=b;
    this.date=d;
  }
  
  getBookDay(){
    if(this.bookOfDay){
    return this.bookOfDay;}
    else return null;
  }

  getDay(){
    return this.date;
  }

  search(searchParam,autorParam){
    const data={
      searchParam: searchParam,
      autorParam: autorParam
    }

    return this.http.post(`${this.uri}/books/search`, data);
  }

  loaned(username, returned){
    const data={
      username: username,
      returned: returned
    }

    return this.http.post(`${this.uri}/books/loaned`, data);
  }

  update(title, username,time){
    const data={
      title: title,
      username: username,
      time: time
    }

    return this.http.post(`${this.uri}/books/returnBook`, data);
  }

  take(title, username,time){
    const data={
      title: title,
      username: username,
      time: time
    }

    return this.http.post(`${this.uri}/books/takeBook`, data);
  }

  add(title, author,genre,publisher,year,lang,cover,num){
    const data = {
      title: title,
      author: author,
      genre: genre,
      publisher: publisher,
      year: year,
      lang: lang,
      cover: cover,
      num: num,
    }

    return this.http.post(`${this.uri}/books/addBook`, data);
  }

  azuriraj(naziv,title, author,genre,publisher,year,lang,cover,num){
    const data = {
      naziv:naziv,
      title: title,
      author: author,
      genre: genre,
      publisher: publisher,
      year: year,
      lang: lang,
      cover: cover,
      num: num,
    }

    return this.http.post(`${this.uri}/books/updateBook`, data);
  }

  delete(title){
    const data = {
      title:title
    }

    return this.http.post(`${this.uri}/books/delete`, data);
  }


}
