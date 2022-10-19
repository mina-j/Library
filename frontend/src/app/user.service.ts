import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';
  username:string;
  type: string;

  constructor(private http: HttpClient) { }

  login (username, password){
    //this.username=username;
    const data={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`,data);
  }

  register(firstname, lastname, username, password, address, tel, email, picture,type,accepted){
    const data={
      firstname: firstname,
      lastname: lastname,
      username: username, 
      password: password,
      address: address,
      tel: tel,
      email: email,
      picture: picture,
      type: type,
      accepted: accepted
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  change (username, password,newpass){
    const data={
      username: username,
      password: password,
      newpass: newpass
    }

    return this.http.post(`${this.uri}/users/change`, data);
  }

  getUser(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/getUser`, data);

  }

  getType(){
    return this.type;
  }

  setType(type){
    this.type=type;
  }

  allUsers(){
    const data={
      num:1
    }
    return this.http.post(`${this.uri}/users/allUsers`, data);
  }

  pending(){
    const data={
      num:0
    }
    return this.http.post(`${this.uri}/users/allUsers`, data);
  }

  accept(username){
    let num=Number(1);
    const data={
      username:username,
      num:num
    }
    return this.http.post(`${this.uri}/users/accept`, data);
  }

  delete(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/remove`, data);
  }

  update(old,username , address , tel , email , picture , type , firstname , lastname){
    const data={
      old:old,
      firstname: firstname,
      lastname: lastname,
      username: username, 
      address: address,
      tel: tel,
      email: email,
      picture: picture,
      type: type,
    }
    return this.http.post(`${this.uri}/users/update`, data);
  }

  rok(day){
    const data={
      day:day
    }
    return this.http.post(`${this.uri}/users/rok`, data);

  }

  getRok(){
    return this.http.get(`${this.uri}/users/getRok`);

  }


}
