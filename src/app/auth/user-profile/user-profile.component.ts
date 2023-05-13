import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { ProductModel } from 'src/app/shared/product-model';
import { ProductService } from 'src/app/shared/product.service';
import { AuthService } from '../shared/auth.service';
import { UserResponse } from 'src/app/shared/model/user.response';
import { throwError } from 'rxjs';

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
  priviliges?: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
     private authService: AuthService, private router: Router) {
    this.searchedUserName = this.activatedRoute.snapshot.params['name'];
    this.authService.getUser(this.searchedUserName).subscribe(data => {

      this.searchedUser = data;
    }, error => {
      throwError(error);
      this.router.navigateByUrl('/not-found');
    });
    this.currentUser = authService.getUserName();
    this.productService.getAllProductsByUser(this.searchedUserName).subscribe(data => {
      this.products = data;
    });
    
    if(this.searchedUserName === this.currentUser) {
      this.priviliges = true;
    }
  }

  ngOnInit(): void {
  }

  goToProduct(id: number): void {
    this.router.navigateByUrl('/view-product/' + id);
  }

  goToEditProduct(id: number): void {
    this.router.navigateByUrl('/update-product/'+ id);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProductById(id);
  }

}
