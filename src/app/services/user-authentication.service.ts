import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  //is logged subject
  private IsLoggedSubject: BehaviorSubject<boolean>;
  //IS admin
  private IsAdminSubject: BehaviorSubject<boolean>;

  //login object
  loginObj: any =
    {
      "email": '',
      "password": ''
    };
  //api url
  baseURL: string = 'https://localhost:7211/api/Login';

  //inject http to call wepapi
  constructor(private httpclient: HttpClient) {
    //initialize subject
    this.IsLoggedSubject = new BehaviorSubject<boolean>(false);
    this.IsAdminSubject = new BehaviorSubject<boolean>(false);

  }

  //login function
  // Login function
  login(email: string, password: string): Observable<boolean> {
    //used pipe to combine more than one operation, and map for transform emitted values
    return this.httpclient.post<any>(`${this.baseURL}`, { email, password }).pipe(
      map(res => {
        //console.log('Response data:', res);
        if (res && res.success) {
          localStorage.setItem('LoginTokn', res.data.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('IsAdmin', res.isAdmin.toString());
          //change loggedsubject value
          this.IsLoggedSubject.next(true);
          if (res.isAdmin == true) {
            //change value
            this.IsAdminSubject.next(true);
          }
          return true;
        }
        else {
          throw new Error(res.message || 'Login failed');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }


  // Logout function
  logout(): void {
    localStorage.removeItem('LoginTokn');
    localStorage.removeItem('isLoggedIn');
    this.IsLoggedSubject.next(false);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getLoggedStatus() {
    return this.IsLoggedSubject;
  }


  //get admin status function
  getAdminStatus(): Observable<boolean> {
    // Check if the IsAdmin value exists in local storage
    const isAdminFromLocalStorage = localStorage.getItem('IsAdmin') === 'true';

    // If the IsAdmin value exists in local storage, use it
    if (isAdminFromLocalStorage) {
      this.IsAdminSubject.next(isAdminFromLocalStorage);
      return this.IsAdminSubject.asObservable();
    }

    // Otherwise, return the IsAdmin value from the BehaviorSubject
    return this.IsAdminSubject.asObservable();
  }

  IsAdmin(): boolean {
    return localStorage.getItem('IsAdmin') === 'true';
  }
}
