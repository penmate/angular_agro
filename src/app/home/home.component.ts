import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../shared/product-model';
import { ProductService } from '../shared/product.service';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<ProductModel> = [];
  isLoggedIn?: boolean;
  searchFormGroup: FormGroup;


  constructor(private productService: ProductService, private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getAllProducts();
    this.searchFormGroup = new FormGroup({
      search: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(searchKey).subscribe(product => {
      this.products = product;
    });
  }

  searchByKeyWord(searchKeyWord: string) {
    console.log(searchKeyWord)
    this.products = [];
    this.getAllProducts(searchKeyWord);

  }

}
