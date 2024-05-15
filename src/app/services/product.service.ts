import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { Status } from '../models/status';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //URL for API
  private baseUrl: string;

  constructor(public http: HttpClient,) {
    //initialize
    this.baseUrl = 'https://localhost:7211/api/Products';
  }

  // Fetch all products
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl)
      //pipe to execute more than one action in single chain
      .pipe(
        catchError(error => throwError('Error fetching products.'))
      );
  }
  // Fetch product by ID

  getProductById(productId: number): Observable<IProduct> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get<IProduct>(url)
      .pipe(
        catchError(error => throwError('Error fetching product by ID.'))
      );
  }

  // Add a new product with image
  Add(product: any) 
  {
    return this.http.post<Status>(this.baseUrl, product);
  }

  // Delete a product
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete(url)
      .pipe(
        catchError(error => throwError('Error deleting product.'))
      );
  }

  // Edit a product
  editProduct(productId: number, product: any) {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.put(url, product)
     
  }
}
