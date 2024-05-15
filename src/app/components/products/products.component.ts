import { Component, OnDestroy, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit
{
   // here i need to get all products from api
   products: IProduct[] = [];

  //to get the value if he admin or not
  isAdmin: boolean = false;
  //CTOR
  constructor(private userService: UserAuthenticationService,
              private productService: ProductService,
              private route:Router) {}
  //
  ngOnInit(): void {
    // Get the isAdmin value from local storage
    const isAdminFromLocalStorage = localStorage.getItem('IsAdmin') === 'true';
  
    // Update the isAdmin property in the component
    this.isAdmin = isAdminFromLocalStorage;
  
    // Subscribe to changes in admin status
    this.userService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });
  
    // Get all products
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
  //refresh the page
  refreshProducts(): void 
  {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  //handle delete 
  deleteProduct(productId: number): void 
  {
    if (confirm('Are you sure you want to delete this product?')) 
    {
      this.productService.deleteProduct(productId).subscribe(() => 
      {
        // Remove the deleted product from the local array
        this.products = this.products.filter(product => product.id !== productId);
        // Refresh the product list
        this.refreshProducts();
      });
    }
  }
}