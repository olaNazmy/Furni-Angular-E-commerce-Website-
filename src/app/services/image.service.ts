import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService 
{
   //URL for API
   private baseUrl: string = '';
   //
   constructor(public http: HttpClient) 
   {
    //initialize
    this.baseUrl = 'https://localhost:7211/resources/';
  }
  // Fetch image by name
  getImageByName(imageName: string): Observable<Blob> 
  {
    const url = `${this.baseUrl}${imageName}`;
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        catchError(error => throwError('Error fetching image.'))
      );
  }
  
}
