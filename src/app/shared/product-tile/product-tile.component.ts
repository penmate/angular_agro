import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product-model';
import { ProductService } from '../product.service';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {

  faComments = faComments;

  products: Array<ProductModel> = [];

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe(product => {
      this.products = product;
    });
  }

  ngOnInit(): void {
  }

}
