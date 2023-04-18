import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { ProductModel } from 'src/app/shared/product-model';
import { ProductService } from 'src/app/shared/product.service';
import { AuthService } from '../shared/auth.service';
import { UserResponse } from 'src/app/shared/model/user.response';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  searchedUserName: string;
  searchedUser?: UserResponse;
  products: Array<ProductModel> = [];
  comments?: CommentPayload[];
  currentUser?: any;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private authService: AuthService) {
    this.searchedUserName = this.activatedRoute.snapshot.params['name'];
    this.authService.getUser(this.searchedUserName).subscribe(data => {
      console.log(data);
      this.searchedUser = data;
    });
    this.currentUser = authService.getUserName();

    this.productService.getAllProductsByUser(this.searchedUserName).subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit(): void {
    console.log(this.searchedUser + "ASD");
  }

}
