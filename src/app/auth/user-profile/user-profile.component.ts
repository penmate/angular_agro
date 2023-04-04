import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { ProductModel } from 'src/app/shared/product-model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  products: Array<ProductModel> = [];
  comments?: CommentPayload[];

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
    this.name = this.activatedRoute.snapshot.params['name'];

    this.productService.getAllProductsByUser(this.name).subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit(): void {
  }

}
