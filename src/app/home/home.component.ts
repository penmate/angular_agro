import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../shared/product-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<ProductModel> = [];

  constructor() {}

  ngOnInit(): void {
  }

}
