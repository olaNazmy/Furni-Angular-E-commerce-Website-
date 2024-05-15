import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent 
{
  //get product by id
  product: any;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router:Router)
    {
    this.route.params.subscribe(params => 
    {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    });
  }

  //check in quantity
  getColor(): string 
  {
    if (this.product.quantity > 1) {
      return 'green';
    } else if (this.product.quantity === 1) 
    {
      return '#DAA520';
    } else {
      return 'red';
    }
  }
  //
  getStockMessage(): string {
    if (this.product.quantity > 1) {
      return `In Stock`;
    } else if (this.product.quantity === 1) {
      return `1 items left`;
    } else {
      return `Out of stock`;
    }
  }
  //
  backtoproducts() 
  {
    // navigate to the products page
    this.router.navigateByUrl('/products');
  }

}
