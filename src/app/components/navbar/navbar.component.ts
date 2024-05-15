import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  //variable to check the login in status
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private subscription: Subscription | undefined;
  //CTOR 
  constructor(private route: Router, private userService: UserAuthenticationService) { }
  //
  ngOnInit(): void {
    // Check login status from localStorage
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.IsAdmin();

    // Subscribe to changes in login status
    this.subscription = this.userService.getLoggedStatus().subscribe(status => {
      this.isLoggedIn = status;
    });

    // Subscribe to changes in admin status
    this.subscription = this.userService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });

    // Check if the user is logged in based on the local storage value
    const isLoggedInFromLocalStorage = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedInFromLocalStorage) {
      this.isLoggedIn = true;

      // Check if the user is an admin based on the local storage value
      const isAdminFromLocalStorage = localStorage.getItem('IsAdmin') === 'true';
      if (isAdminFromLocalStorage) {
        this.isAdmin = true;
      }
    }

  }

  logout(): void {
    // Clear login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('IsAdmin');

    // Update component properties
    this.isLoggedIn = false;
    this.isAdmin = false;

    // Call logout method from user service
    this.userService.logout();
    this.route.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
