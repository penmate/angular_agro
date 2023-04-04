import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../shared/product-model';
import { ProductService } from '../shared/product.service';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<ProductModel> = [];
  isLoggedIn?: boolean;

  constructor(private productService: ProductService, private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.productService.getAllProducts().subscribe(product => {
      this.products = product;
    });
  }

  ngOnInit(): void {
    if (this.authService.isTokenExpired(this.authService.getJwtToken()) === true) {
        this.authService.logout();
        this.isLoggedIn = false;
        this.router.navigateByUrl('/login');
    }
  }

}
