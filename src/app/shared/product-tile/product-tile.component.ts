import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../product-model';
import { ProductService } from '../product.service';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {

  faComments = faComments;

  @Input()
  products?: ProductModel[];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  goToProduct(id: number): void {
    this.router.navigateByUrl('/view-product/' + id);
  }

}
