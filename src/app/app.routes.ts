import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/authentication/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductformComponent } from './components/products/productform/productform.component';
import { ContactusComponent } from './components/contact/contactus/contactus.component';

export const routes: Routes =
  [
    //1- Default, will render home that exist in app
    { path: '', component: HomeComponent },
    //2- will bind products, product details
    //i need to open it if user logged in only, increase guard part
    { path: 'products', component: ProductsComponent, canActivate:[authGuard] },

    { path: 'products/:id', component: ProductDetailsComponent,canActivate:[authGuard] },

    { path: 'products/:id/edit', component: ProductformComponent, canActivate: [authGuard] },

    //3- login path
    { path: 'login', component: LoginComponent }, 
    { path: 'contactus', component: ContactusComponent }, 

    {path:'**',component:NotfoundComponent}
  ];
