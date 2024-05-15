import { HttpClientModule } from '@angular/common/http'; 
//
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductformComponent } from './components/products/productform/productform.component';
import { ContactusComponent } from './components/contact/contactus/contactus.component';
//
@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [
    HomeComponent,NavbarComponent,SliderComponent,
    FooterComponent,RouterModule,RouterOutlet,
    ProductsComponent,ProductDetailsComponent,LoginComponent,RegisterComponent,
    ProductItemComponent,FormsModule,CommonModule,
    HttpClientModule,NotfoundComponent, ProductformComponent, ReactiveFormsModule, ContactusComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'Funi-Eccomerce';
}
