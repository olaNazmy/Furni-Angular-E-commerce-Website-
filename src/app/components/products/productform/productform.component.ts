import { Status } from './../../../models/status';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../models/iproduct';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-productform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  ProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    Quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    imageUrl: new FormControl('')
  });
  ////////////////////////////////////////////////////////////////////////////////////////
  productId: any;
  productObj: any;
  status!: Status;
  Product: any;
  ////////////////////////////////////////////////////////////////////////////////////////
  constructor(public activatedroute: ActivatedRoute,
    public productService: ProductService, public router: Router,
    public imagservice: ImageService) { }

  //

  ngOnInit(): void {
    //get id
    this.productId = this.activatedroute.snapshot.params['id'];
    if (this.productId != 0) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        // Bind product data to form
        this.productObj = product;
        this.ProductForm.patchValue({
          productName: product.productName,
          productPrice: product.productPrice,
          Quantity: product.quantity,
          description: product.description,
          imageUrl: product.imageUrl

        });
      });
    }
  }
  //////////////////////////////setter and geter//////////////////////////////////////////////////////////
  get productName(): string {
    return this.ProductForm.get('productName')?.value as string;
  }

  get productPrice(): number {
    return this.ProductForm.get('productPrice')?.value as number;
  }

  get productQuantity(): number {
    return this.ProductForm.get('Quantity')?.value as number;
  }

  get productDescription(): string {
    return this.ProductForm.get('description')?.value as string;
  }

  get productImage(): File {
    return this.ProductForm.get('imageUrl')?.value as unknown as File;
  }
  getform() {
    return this.ProductForm.controls;
  }
  ////////////////////////////////////image////////////////////////////////////////////////////
  selectedFile: File | undefined;

  onFileSelected(event: any) 
  {
    this.selectedFile = event.target.files[0] as File;
    this.uploadFile();
  }

  uploadFile() 
  {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'wr4omhfn');

      fetch('https://api.cloudinary.com/v1_1/dmnp4k8oj/image/upload',
        {
          method: 'POST',
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            this.ProductForm?.patchValue({ imageUrl: data.secure_url });
          }
        })
        .catch((error) => {
          console.error('Error uploading file to Cloudinary:', error);
        });
    }
  }
  //handle add product
  ProductHandler() {
    if (this.ProductForm.status == 'VALID') {
      if (this.productId == 0) {
        this.status = { statusCode: 0, message: "wait..." };

        //we will call our service and pass object to it
        console.log(this.ProductForm.value);
        this.productService.Add(this.ProductForm.value).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/products');
          },
          error: (err) => {
            this.status = { statusCode: 0, message: "Error in adding product..." };
            console.log(err);

          }

        });
      }
      else {

        this.Product = this.ProductForm.value;
        this.Product.id = this.productId;
        console.log(this.Product);
        this.productService.editProduct(this.productId, this.Product).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/products');
          },
          error: (err) => {
            this.status = { statusCode: 0, message: "Error in updating product..." };
            console.log(err);
          }
        });

      }
    }

  }


}