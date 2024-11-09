import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  loginobj: any = {
    EmailId: "",
    Password: ""
  }

  http = inject(HttpClient);
  router =inject(Router);
constructor(private user:UserService) { }
login() {
  this.user.onLogin(this.loginobj).subscribe((data: any) => {
    console.log(data);
    localStorage.setItem("tokenData", JSON.stringify(data.data));

    this.router.navigate(["/dashboard"]);
  })
}

}
