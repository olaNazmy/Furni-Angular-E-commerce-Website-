import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,
    RouterOutlet, CommonModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit 
{
  //object for login
  loginObj: any =
    {
      "email": '',
      "password": ''
    };
    //make user logged var to alert status change, use subject in
    UserLoggedStatus:boolean = false;
  //CTOR, inject httpclient
  constructor(private http: HttpClient,
    private route: Router,
    private userService: UserAuthenticationService) { }
  //oninit what u need after ctor, change losing status, subscribe to the value
  ngOnInit(): void 
  {
    this.userService.getLoggedStatus().subscribe( status =>
      {
          this.UserLoggedStatus = status;
      }
    )
  }

  // Login function using UserAuthenticationService
  login(): void 
  {
    const { email, password } = this.loginObj;
    this.userService.login(email, password).subscribe(
      success => {
        if (success) {
          // Navigate to the desired page upon successful login
          this.route.navigateByUrl('/products');
        } else {
          // Handle login failure
          console.error('Login failed');
        }
      }
    );
  }

  // Logout function using UserAuthenticationService
  logout(): void 
  {
    this.userService.logout();
    // Redirect to login page or any other page
    this.route.navigateByUrl('/login');
  }

  // Check if user is logged in using UserAuthenticationService
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}

