import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../shared/product-model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<ProductModel> = [];

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe(product => {
      this.products = product;
    });
  }

  ngOnInit(): void {
  }

}
