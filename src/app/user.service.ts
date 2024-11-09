import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $refreshToken = new Subject<boolean>;

  constructor(private http:HttpClient) { 
    this.$refreshToken.subscribe((data:any)=>{
      this.getRefreshToken();
    })
  }

  router=inject(Router);
  onLogin(obj:any){
   
   return this.http.post("https://freeapi.miniprojectideas.com/api/JWT/login",obj)  
  }
  getUsers(){
    return this.http.get("https://freeapi.miniprojectideas.com/api/JWT/GetAllUsers")
  }

  getRefreshToken(){
    let loggedUserData :any;
    // let localData: string | null = null;
    
    // if(typeof window !== 'undefined'){
  
     const localData = localStorage.getItem('tokenData');
    // }
    if(localData != null){
      loggedUserData = JSON.parse(localData);
    }

    const obj = {
      "emailId" : loggedUserData.emailId,
      "token" : "",
      "refreshToken" : loggedUserData.refreshToken
    }
     this.http.post("https://freeapi.miniprojectideas.com/api/JWT/refresh",obj).subscribe((data:any)=>{
      localStorage.setItem("tokenData", JSON.stringify(data.data));

      });
  }
}
